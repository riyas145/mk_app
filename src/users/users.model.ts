export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  dob?: Date;
  address?: string;
  photo?: string;
}

export interface IUserUpdate {
  name?: string;
  dob?: string;
  address?: string;
  photo?: string;
}
