import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser, IUserUpdate } from './users.model';
import { UserDocument, Users } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}
  async createUser(data: IUser): Promise<any> {
    const { password, ...rest } = data;
    const checkUnique = await this.userModel.findOne({ email: data?.email });
    if (checkUnique) {
      return {
        message: 'User already registered please use differnt email',
        status: HttpStatus.BAD_REQUEST,
      };
    }
    try {
      const hasedPassword = await bcrypt.hashSync(password, 10);
      await this.userModel.create({
        ...rest,
        password: hasedPassword,
      });
      return {
        message: 'User Created Successfully',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
  async findUser(email: string): Promise<IUser> {
    const result = this.userModel.findOne({ email });
    if (result) {
      return result;
    }
  }
  async findeUserbyId(id: string): Promise<IUser> {
    const result = this.userModel.findById(id);
    if (result) {
      return result;
    }
  }
  async findByIdandUpdate(data: IUserUpdate, id: string): Promise<any> {
    const result = this.userModel.findByIdAndUpdate(id, data);
    if (result) {
      return result;
    }
  }
}
