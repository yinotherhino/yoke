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
  Req,
} from '@nestjs/common';
import HashEncrypt from 'src/common/utils/HashEncrypt';
import { AuthSchema, option } from 'src/common/utils/Joi';
import { IUser, ICreateUser } from '../common/interfaces/user';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Get()
  // async findAll(): Promise<{ users: Array<IUser>; message: string }> {
  //   const users = (await this.authService.findAll()) as unknown as IUser[];
  //   return { users, message: 'successful' };
  // }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ user: IUser; message: string }> {
    try {
      const user = (await this.authService.findOne(id)) as unknown as IUser;
      if (!user) {
        throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
      }
      return { user, message: 'successful' };
    } catch (err) {
      console.log(err);
    }
  }

  @Post('/signup')
  async createUser(
    @Body() user: ICreateUser,
  ): Promise<{ user: IUser; message: string }> {
    const validateResult = AuthSchema.validate(user, option);

    if (validateResult.error) {
      throw new HttpException(
        validateResult.error.details[0].message,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const existingUser = (await this.authService.findByEmail(
      user.email,
    )) as unknown as IUser;
    if (existingUser) {
      throw new HttpException(
        'User with that email already exists',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const hashedPassword = await HashEncrypt.hashPassword(user.password);
    user.password = hashedPassword;

    const newUser = (await this.authService.createOne(
      user,
    )) as unknown as IUser;
    return { user: newUser, message: 'Signup successful' };
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Req() req,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    if (id !== req.user.id) {
      throw new HttpException(
        'You can only delete your account',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.authService.deleteOne(id);
    return { message: 'delete successfully' };
  }

  // @Patch(':id')
  // async updateUser(
  //   @Body() Body: IUpdateUser,
  //   @Param('id') id: string,
  // ): Promise<{ user: IUser; message: string }> {
  //   const updatedUser = await this.authService.updateOne(Body, id);
  //   return { user: updatedUser, message: 'updated successfully' };
  // }

  @Post('login')
  async loginUser(
    @Body() user: IUser,
  ): Promise<{ user: IUser; token: string; message: string }> {
    const validateResult = AuthSchema.validate(user, option);

    if (validateResult.error) {
      throw new HttpException(
        validateResult.error.details[0].message,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const existingUser = await this.authService.findByEmail(user.email);
    if (!existingUser) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }
    const isAuthenticated = await HashEncrypt.verifyPassword(
      user.password,
      existingUser.password,
    );
    if (!isAuthenticated) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    } else {
      const token = HashEncrypt.generateToken({
        id: existingUser.id,
        email: existingUser.email,
      });
      return { user: existingUser, token, message: 'Login successful' };
    }
  }
}
