import { Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwt: JwtService) {}
  async validateUser(email: string, password: string): Promise<any> {
    console.log('validateUser()');
    const user = await this.userService.findUser(email);
    if (user && (await bcrypt.compareSync(password, user.password))) {
      return user;
    }
    return null;
  }
  async login(user: IUser): Promise<any> {
    const payload = { email: user.email, id: user?._id };
    const token = this.jwt.sign(payload);
    return {
      status: HttpStatus.CREATED,
      message: 'User Loged in Successfully',
      access_token: token,
    };
  }
}
