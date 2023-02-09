import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

export type NoteDocument = Notes & Document;

@Schema()
export class Notes {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  links: [
    {
      position: number;
      length: number;
      url: string;
    },
  ];
}

export const notesSchema = SchemaFactory.createForClass(Notes);
