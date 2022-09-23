import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/signup')
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    return await this.usersService.createUser({ name, email, password });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/test')
  async getUser(@Request() req, @Body('val') val: string): Promise<any> {
    return {
      message: 'User Valid',
      data: val,
      token: req.user,
    };
  }
}
