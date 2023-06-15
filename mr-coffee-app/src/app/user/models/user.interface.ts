export interface IUser {
  user_id?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}