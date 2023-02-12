import { Response, NextFunction } from 'express';
import {
  HttpException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { RequestWithUser } from 'src/types';
import { IUser } from '../interfaces/user';
import HashAndEncrypt from '../utils/HashEncrypt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    // try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new UnauthorizedException('No authorization token provided');
    }

    let decodedToken: any;
    try {
      const token = bearerToken.split(' ')[1];
      decodedToken = HashAndEncrypt.decodeToken(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    if (!decodedToken.id) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    const user = (await this.UserModel.findById(
      decodedToken.id,
    )) as unknown as IUser;
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.user = user;
    next();
    // } catch (err) {
    //   console.log(err);
    //   throw err;
    // }
  }
}
