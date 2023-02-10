import { Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import config from '../config/config';
import { User, UserDocument } from 'src/schemas/user.schema';
import { RequestWithUser } from 'src/types';
import { IUser } from '../interfaces/user';
import HashAndEncrypt from '../utils/HashEncrypt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
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

    if (!decodedToken.userId) {
      throw new UnauthorizedException('Invalid authorization token');
    }

    const user = (await this.userModel.findById(
      decodedToken.id,
    )) as unknown as IUser;
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.user = user;
    next();
  }
}
