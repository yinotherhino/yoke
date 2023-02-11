import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, notesSchema } from 'src/schemas/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: notesSchema }]),
  ],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
