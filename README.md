# MrCoffee 
Users can register and log into the system to manage schedules. User and schedule data are stored in the PostgreSQL database. The passwords are encrypted for security reasons. Error handling has been implemented in the project at the application level and the server level.

## Angular + Express + PostgreSQL Project
This project was generated with Angular CLI version 15.2.6. In addition, it is based on PostgreSQL and Express technologies. The project uses various solutions, which are presented below.

### Technologies used
The project utilizes the following technologies:

* Angular - a framework for building web applications
* Express - a framework for building servers in Node.js
* PostgreSQL - a relational database

## Angular framework
Example Angular mechanisms utilized in the project include:

- Server Communication: The application uses a server API to perform operations on data, such as retrieving user information, updating passwords, modifying and deleting data, etc. The communication with the server is done using the HTTP protocol, and Angular provides mechanisms like HttpClient to make HTTP requests.
- JWT Token for Authentication: JWT token is used for user authentication. After successful authentication, the user receives a JWT token, which is stored on the client-side. This token is utilized for user authorization when making API requests.
- AuthGuard: The application utilizes AuthGuard to secure access to pages, protecting restricted routes and controlling access to individual views. AuthGuard checks if the user is authenticated before granting access to protected routes. If the user is not authenticated, AuthGuard redirects them to the login page.
- Routing: The routing module is used to define paths and navigate between views. Components to be rendered for specific paths and available parameters are specified.
- Forms: The project utilizes both Reactive Forms and Template-driven Forms. Angular provides functions and directives like formGroup and formControlName to manage form state and values. Forms are bound to respective data models to store user-entered values and perform operations on the data.
- Form Validation: Built-in and custom validation mechanisms are used to validate user-entered data in forms.
- Interfaces: Interfaces have been added to improve code readability, maintain consistency in data structures, and ensure type correctness. The IUser and ISchedule interfaces define data types and object structures for users and schedules.
- Bootstrap: The project incorporates the Bootstrap library for user interface styling and layout. Bootstrap enables the addition of interactions using ready-made modals, buttons and forms.

## Express
In the project, Express serves as the application server. 

- Endpoints: Express allows define routes for the application using methods like get, post, put, delete, etc. Each route specifies how the application should respond to client HTTP requests.
- Request and Response Handling: Express provides functions to handle requests and generate responses. For example, req.params allows access to parameters passed in the URL path, while res.status and res.json are used to set the response status and send data in JSON format.
- Database Connection: Express is integrate with the database using libraries like pg (for PostgreSQL). In the project, the pool.query method was used to execute database queries and retrieve results.
- Error Handling: Express allows for error handling and returning appropriate responses in case of exceptions or failures. In the project, a try-catch construct was used to catch errors and return the corresponding JSON responses.
- Middleware: Express supports middleware, which allows for processing requests and responses in the server's flow. Middleware can be used for tasks such as authentication, logging, request body parsing, etc.

In summary, Express in the project is responsible for handling routes, communicating with the database, request handling and response generation, error handling and integration with other modules or libraries.

## PostgreSQL database
The project uses a relational PostgreSQL database to store information about users and schedule. The project utilizes triggers in the PostgreSQL database to enforce specific data integrity rules. These triggers are designed to prevent the creation of duplicate appointments and the creation of user accounts with identical addresses and the same date and time.

For duplicate appointments, a trigger is set up to check for existing appointments with the same date, time, and user before a new appointment is inserted into the database. If a duplicate is detected, the trigger will raise an error and prevent the insertion.

Similarly, for user accounts, a trigger is implemented to verify if an address already exists in the database and if the user already has an appointment with the same date and time when a new account is being created. If a matching address or a duplicate appointment is found, the trigger will halt the creation process and generate an error message.

By utilizing these triggers, the project ensures the integrity and consistency of the data stored in the PostgreSQL database, providing a robust and reliable system for managing user information and schedules.

## STARTING PROJECT

### Development server Angular

`cd mr-coffee-app/src/app`

Run `npm  start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Development server Express

`cd server`

Run `npm  start` for a dev server. Navigate to `http://localhost:3000/api`. The application will automatically reload if you change any of the source files.

### DB PostgreSQL

`cd server/database`

**Running the database schema:**
* Install PostgreSQL on your computer.
* Create an empty database in PostgreSQL.
* Run the schema.sql file to create the database schema in the new database.

## TESTING DATA
**Users:**
* login: johnny@bravo.pl password: Johnny!@123
* login: donald@duck.com password: Donald!@123
* login: jack@sparrow.com password: Jack!@123
* login: bugs@bunny.eu password: Bugs!@123
