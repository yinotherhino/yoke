import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { IUser } from './interfaces/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOne(id: string) {
    try {
      const user = this.userModel.findById(id);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async findAll() {
    const users = this.userModel.find();
    return users;
  }

  async deleteOne(id: string) {
    const user = this.userModel.findByIdAndRemove(id);
    return user;
  }

  async updateOne(user: IUser, id: string) {
    const updatedUser = this.userModel.findByIdAndUpdate(id, user);
    return updatedUser;
  }

  async createOne(user: IUser) {
    const newUser = this.userModel.create(user);
    return newUser;
  }
}
