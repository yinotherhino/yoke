import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notes, notesSchema } from 'src/schemas/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notes.name, schema: notesSchema }]),
  ],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
