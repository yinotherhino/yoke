import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from '../schemas/notes.schema';
import { INote, IUpdateNote } from '../common/interfaces/notes';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private notesModel: Model<NoteDocument>,
  ) {}

  async findOne(id: string): Promise<INote | null> {
    return await this.notesModel.findById(id);
  }

  async findAllByOwnerId(id: string): Promise<Array<INote> | null> {
    return await this.notesModel.find({ owner: id });
  }

  async deleteOne(id: string) {
    return await this.notesModel.findByIdAndRemove(id);
  }

  async updateOne(note: IUpdateNote, id: string) {
    return await this.notesModel.findByIdAndUpdate(id, note);
  }

  async createOne(note: INote) {
    return await this.notesModel.create(note);
  }

  async clearCollection() {
    await this.notesModel.remove();
  }
}
