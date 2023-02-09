import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { IUser, ICreateUser, IUpdateUser } from './interfaces/user';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  async findAll(): Promise<{ users: Array<IUser> }> {
    const users = (await this.authService.findAll()) as unknown as IUser[];
    return { users };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ user: IUser }> {
    const user = (await this.authService.findOne(id)) as unknown as IUser;
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return { user };
  }

  @Post()
  async createUser(@Body() user: ICreateUser): Promise<{ user: IUser }> {
    const newUser = (await this.authService.createOne(
      user,
    )) as unknown as IUser;
    return { user: newUser };
  }

  @Delete()
  @HttpCode(204)
  async deleteUser(@Param() id: string): Promise<null> {
    await this.authService.deleteOne(id);
    return null;
  }

  @Patch(':id')
  async updateUser(
    @Body() Body: IUpdateUser,
    @Param('id') id: string,
  ): Promise<{ user: IUser }> {
    const updatedUser = await this.authService.updateOne(Body, id);
    return { user: updatedUser };
  }
}
