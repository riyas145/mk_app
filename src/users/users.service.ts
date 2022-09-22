import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './users.model';
import { UserDocument, Users } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}
  async createUser(data: IUser): Promise<any> {
    const { password, ...rest } = data;
    try {
      const hasedPassword = await bcrypt.hashSync(password, 10);
      const result = await this.userModel.create({
        ...rest,
        password: hasedPassword,
      });
      return {
        message: 'User Created Successfully',
        data: { result },
      };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }
  async findUser(email: string): Promise<any> {
    console.log('findeUser()');
    const result = this.userModel.findOne({ email });
    if (result) {
      return result;
    }
  }
}
