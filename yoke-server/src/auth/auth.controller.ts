import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { IUser, ICreateUser, IUpdateUser } from './interfaces/user';

@Controller('auth')
export class AuthController {
  @Get()
  async findAll(): Promise<{ user: number }> {
    const user = 23;
    return { user };
  }

  @Post()
  async createUser(@Body() user: ICreateUser): Promise<{ user: IUser }> {
    const newUser = { ...user, verified: false, id: '1' };
    return { user: newUser };
  }

  @Delete()
  async deleteUser(@Param() id: string): Promise<string> {
    return id;
  }

  @Patch()
  async updateUser(@Body() Body: IUpdateUser): Promise<{}> {
    const updatedUser = {};
    return updatedUser;
  }
}
