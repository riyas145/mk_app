import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  UseGuards,
  Request,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUser, IUserUpdate } from './users.model';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/signup')
  async createUser(@Body() data: IUser): Promise<any> {
    return await this.usersService.createUser(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile-details')
  async getUser(@Request() req): Promise<any> {
    const { id } = req.user;
    const getUserDetails = await this.usersService.findeUserbyId(id);
    const { name, email, address, dob, photo, _id } = getUserDetails;
    if (getUserDetails) {
      return {
        status: HttpStatus.OK,
        message: 'User Details found',
        data: { name, email, dob, address, photo, _id },
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User Details not found',
      };
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile-details/:id')
  async getUserById(@Param('id') id: string): Promise<any> {
    const getUserDetails = await this.usersService.findeUserbyId(id);
    const { name, email, address, dob, photo, _id } = getUserDetails;
    if (getUserDetails) {
      return {
        status: HttpStatus.OK,
        message: 'User Details found',
        data: { name, email, dob, address, photo, _id },
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User Details not found',
      };
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('/update-profile')
  async updateProfile(@Request() req, @Body() data: IUserUpdate): Promise<any> {
    const { id } = req?.user;
    console.log(data);
    try {
      await this.usersService.findByIdandUpdate(data, id);
      return {
        status: HttpStatus.OK,
        message: 'User Details Updated',
      };
    } catch (error) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }
}
