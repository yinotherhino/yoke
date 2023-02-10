import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { ICreateUser, IUpdateUser, IUser } from '../common/interfaces/user';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findOne(id: string): Promise<IUser | null> {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ email });
  }

  async findAll(): Promise<Array<IUser> | null> {
    return await this.userModel.find();
  }

  async deleteOne(id: string) {
    return await this.userModel.findByIdAndRemove(id);
  }

  async updateOne(user: IUpdateUser, id: string) {
    return await this.userModel.findByIdAndUpdate(id, user);
  }

  async createOne(user: ICreateUser) {
    return await this.userModel.create(user);
  }
}
