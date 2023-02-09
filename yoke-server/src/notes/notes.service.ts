import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notes, NoteDocument } from '../schemas/notes.schema';
import { INotes, IUpdateNote } from '../common/interfaces/notes';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Notes.name)
    private notesModel: Model<NoteDocument>,
  ) {}

  async findOne(id: string): Promise<INotes | null> {
    return await this.notesModel.findById(id);
  }

  async findAll(): Promise<Array<INotes> | null> {
    return await this.notesModel.find();
  }

  async deleteOne(id: string) {
    return await this.notesModel.findByIdAndRemove(id);
  }

  async updateOne(note: IUpdateNote, id: string) {
    return await this.notesModel.findByIdAndUpdate(id, note);
  }

  async createOne(note: INotes) {
    return await this.notesModel.create(note);
  }
}
