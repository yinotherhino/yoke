import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { INote, IUpdateNote } from 'src/common/interfaces/notes';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  async findAll(@Req() req): Promise<{ notes: Array<INote> }> {
    const notes = (await this.noteService.findAllByOwnerId(
      req.user._id,
    )) as unknown as INote[];
    return { notes };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ note: INote }> {
    const note = (await this.noteService.findOne(id)) as unknown as INote;
    if (!note) {
      throw new HttpException('note not found.', HttpStatus.NOT_FOUND);
    }
    return { note };
  }

  @Post()
  @HttpCode(201)
  async createNote(
    @Req() req,
    @Body() note: INote,
  ): Promise<{ note: INote; message: string }> {
    note['owner'] = req.user._id;
    const newNote = (await this.noteService.createOne(
      note,
    )) as unknown as INote;
    return { note: newNote, message: 'note added successfully' };
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<{ message: string }> {
    await this.noteService.deleteOne(id);
    return { message: 'deleted successfully' };
  }

  @Patch(':id')
  async updateNote(
    @Body() Body: IUpdateNote,
    @Param('id') id: string,
  ): Promise<{ note: INote }> {
    const updatedNote = await this.noteService.updateOne(Body, id);
    return { note: updatedNote };
  }
}
