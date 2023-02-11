import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  links: [
    {
      start: number;
      end: number;
      url: string;
    },
  ];
}

export const notesSchema = SchemaFactory.createForClass(Note);
