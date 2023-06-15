import express from 'express';
import pg from 'pg';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;
const jwtSecret = 'my-super-secret-key';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const dbPassword = process.env.DB_PASSWORD;

const pool = new pg.Pool({
  user: 'MrCoffee',
  host: 'localhost',
  database: 'MrCoffee_DB_v2',
  password: dbPassword,
  port: 5432,
});

app.post('/api/signup', (req, res, next) => {
  const hashedUserPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
  const newUser = {
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hashedUserPassword,
  };
  const query = 'INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [newUser.email, newUser.firstname, newUser.lastname, newUser.password];
  pool.query(query, values, (err, result) => {
    if (err) {
      if (err.constraint === "users_email_key") {
        return res.status(409).json({
          message: "Email already exists in the database."
        });
      } else {
        return next(err);
      }
    }
    return res.status(200).json({
      message: "User created successfully"
    });
  });
});

app.post('/api/login', async function (req, res) {
  const { email, password } = req.body;
  const hashedUserPassword = crypto.createHash('sha256').update(password).digest('hex');
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  try {
    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email.'
      });
    }

    const isPasswordValid = user.password === hashedUserPassword;

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password.'
      });
    }

    const token = jwt.sign({ sub: user.id }, jwtSecret);

    return res.status(200).json({
      message: 'User logged in.',
      access_token: token,
      user_id: user.user_id
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.get('/api/users', async function (req, res) {
  try {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    const users = result.rows;

    return res.status(200).json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.get('/api/user/:userId', async function (req, res) {
  const userId = req.params.userId;

  try {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const values = [userId];
    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.delete('/api/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const deleteUserQuery = 'DELETE FROM users WHERE user_id = $1';
    const deleteUserValues = [userId];
    const result = await pool.query(deleteUserQuery, deleteUserValues);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    return res.status(200).json({
      message: 'User deleted successfully.'
    });

  } catch (error) {
    console.error(error);

    if (error.code === '23503') {
      return res.status(409).json({
        message: 'User with schedule cannot be deleted.'
      })
    }
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.put('/api/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { firstname, lastname } = req.body;

  try {
    const checkUserQuery = 'SELECT * FROM users WHERE user_id = $1';
    const checkUserValues = [userId];
    const userResult = await pool.query(checkUserQuery, checkUserValues);
    const userExists = userResult.rowCount > 0;

    if (!userExists) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    const disableTriggerQuery = 'ALTER TABLE users DISABLE TRIGGER unique_email';
    await pool.query(disableTriggerQuery);

    const updateUserQuery = 'UPDATE users SET firstname = $1, lastname = $2 WHERE user_id = $3';
    const updateUserValues = [firstname, lastname, userId];

    if (firstname === userResult.rows[0].firstname && lastname === userResult.rows[0].lastname) {
      return res.status(400).json({
        message: 'No changes provided.'
      });
    }

    await pool.query(updateUserQuery, updateUserValues);

    const enableTriggerQuery = 'ALTER TABLE users ENABLE TRIGGER unique_email';
    await pool.query(enableTriggerQuery);

    return res.status(200).json({
      message: 'User updated successfully.'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.put('/api/user/:userId/password/', async (req, res) => {
  const userId = req.params.userId;
  const { currentPassword, newPassword } = req.body;
  const hashedUserPassword = crypto.createHash('sha256').update(currentPassword).digest('hex');

  try {
    const checkUserQuery = 'SELECT * FROM users WHERE user_id = $1';
    const checkUserValues = [userId];
    const userResult = await pool.query(checkUserQuery, checkUserValues);
    const userExists = userResult.rowCount > 0;

    if (!userExists) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    const currentPasswordHash = userResult.rows[0].password;
    const isPasswordValid = currentPasswordHash === hashedUserPassword;

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid current password.'
      });
    }

    const disableTriggerQuery = 'ALTER TABLE users DISABLE TRIGGER unique_email';
    await pool.query(disableTriggerQuery);

    const newPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');

    if (newPassword === currentPassword) {
      return res.status(400).json({
        message: 'New password must be different from the current password.'
      });
    }

    const updateUserQuery = 'UPDATE users SET password = $1 WHERE user_id = $2';
    const updateUserValues = [newPasswordHash, userId];
    await pool.query(updateUserQuery, updateUserValues);

    const enableTriggerQuery = 'ALTER TABLE users ENABLE TRIGGER unique_email';
    await pool.query(enableTriggerQuery);

    return res.status(200).json({
      message: 'Password updated successfully.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

const createScheduleFromReq = (req) => ({
  date: req.body.date,
  start_at: req.body.start_at,
  end_at: req.body.end_at,
  user_id: req.body.user_id,
});

app.post('/api/schedule/new', async (req, res) => {
  try {
    const newSchedule = createScheduleFromReq(req);
    const query = 'INSERT INTO schedule (date, start_at, end_at, user_id) VALUES ($1, $2, $3, $4)';
    const values = [newSchedule.date, newSchedule.start_at, newSchedule.end_at, newSchedule.user_id];
    await pool.query(query, values);

    return res.status(200).json({
      message: 'Schedule created successfully.'
    });
  } catch (error) {
    catchErrorCreateOrEditSchedule(error, res);
  }
});

app.put('/api/schedule/:scheduleId', async (req, res) => {
  const scheduleId = req.params.scheduleId;
  const { date, start_at, end_at, user_id } = req.body;

  try {
    const userQuery = 'SELECT * FROM users WHERE user_id = $1';
    const userValues = [user_id];
    const userResult = await pool.query(userQuery, userValues);

    if (userResult.rowCount === 0) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    const query = 'UPDATE schedule SET date = $1, start_at = $2, end_at = $3, user_id = $4 WHERE schedule_id = $5';
    const values = [date, start_at, end_at, user_id, scheduleId];

    const existingScheduleQuery = 'SELECT * FROM schedule WHERE schedule_id = $1 AND date = $2 AND start_at = $3 AND end_at = $4 AND user_id = $5';
    const existingScheduleValues = [scheduleId, date, start_at, end_at, user_id];
    const existingScheduleResult = await pool.query(existingScheduleQuery, existingScheduleValues);

    if (existingScheduleResult.rowCount > 0) {
      return res.status(400).json({
        message: 'No changes provided.'
      });
    }

    await pool.query(query, values);

    return res.status(200).json({
      message: 'Schedule updated successfully.'
    });
  } catch (error) {
    catchErrorCreateOrEditSchedule(error, res);
  }
});

const catchErrorCreateOrEditSchedule = (error, res) => {
  if (error.code === '23503') {
    return res.status(404).json({
      message: 'User not found.'
    });
  } else if (error.code === 'P0001') {
    return res.status(409).json({
      message: 'A meeting already exists at the specified date and time.'
    });
  } else {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
};

app.get('/api/schedule', async (req, res) => {
  try {
    const query = 'SELECT schedule_id, to_char(date, \'YYYY-MM-DD\') as date, start_at, end_at, user_id FROM schedule';
    const result = await pool.query(query);
    const schedules = result.rows;

    return res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.get('/api/schedule/:scheduleId', async (req, res) => {
  const scheduleId = req.params.scheduleId;

  try {
    const query = 'SELECT schedule_id, to_char(date, \'YYYY-MM-DD\') as date, start_at, end_at, user_id FROM schedule WHERE schedule_id = $1';
    const values = [scheduleId];
    const result = await pool.query(query, values);
    const schedule = result.rows[0];

    if (!schedule) {
      return res.status(404).json({
        message: 'Schedule not found.'
      });
    }

    return res.status(200).json(schedule);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.get('/api/schedule/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const checkUserQuery = 'SELECT * FROM users WHERE user_id = $1';
    const checkUserValues = [userId];
    const userResult = await pool.query(checkUserQuery, checkUserValues);
    const userExists = userResult.rowCount > 0;

    if (!userExists) {
      return res.status(404).json({
        message: 'User not found.'
      });
    }

    const query = 'SELECT schedule_id, to_char(date, \'YYYY-MM-DD\') as date, start_at, end_at, user_id FROM schedule WHERE user_id = $1';
    const values = [userId];
    const result = await pool.query(query, values);
    const schedules = result.rows;

    if (schedules.length === 0) {
      return res.status(404).json({
        message: 'User has no schedules.'
      });
    }

    return res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.delete('/api/schedule/:scheduleId', async (req, res) => {
  const scheduleId = req.params.scheduleId;

  try {
    const deleteQuery = 'DELETE FROM schedule WHERE schedule_id = $1';
    const deleteValues = [scheduleId];
    const result = await pool.query(deleteQuery, deleteValues);

    if (!result.rowCount) {
      return res.status(404).json({
        message: 'Schedule not found.'
      });
    }

    return res.status(200).json({
      message: 'Schedule deleted successfully.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error.'
    });
  }
});

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`))
