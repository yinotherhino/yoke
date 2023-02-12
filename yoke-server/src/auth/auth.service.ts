import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { ICreateUser, IUpdateUser, IUser } from '../common/interfaces/user';
import { NoteDocument } from 'src/schemas/notes.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>, // @Inject('Notes') // private notesModel: Model<NoteDocument>,
  ) {}

  async findOne(id: string): Promise<IUser | null> {
    return await this.userModel.findOne({_id: id});
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ email });
  }

  async findAll(): Promise<Array<IUser> | null> {
    return await this.userModel.find();
  }

  async deleteOne(id: string) {
    // await this.notesModel.deleteMany({ owner: id });
    return await this.userModel.findByIdAndRemove({ _id: id });
  }

  async updateOne(user: IUpdateUser, id: string) {
    return await this.userModel.findByIdAndUpdate(id, user);
  }

  async createOne(user: ICreateUser) {
    return await this.userModel.create(user);
  }
}
