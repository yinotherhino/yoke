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

  @Delete()
  async clear() {
    await this.noteService.clearCollection();
    return null;
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<{ note: INote }> {
  //   const note = (await this.noteService.findOne(id)) as unknown as INote;
  //   if (!note) {
  //     throw new HttpException('note not found.', HttpStatus.NOT_FOUND);
  //   }
  //   return { note };
  // }

  @Post()
  @HttpCode(201)
  async createNote(@Req() req, @Body() note: INote): Promise<{ note: INote }> {
    note['owner'] = req.user.id;
    const newNote = (await this.noteService.createOne(
      note,
    )) as unknown as INote;
    return { note: newNote };
  }

  @Delete()
  @HttpCode(204)
  async deleteNote(@Param() id: string): Promise<null> {
    await this.noteService.deleteOne(id);
    return null;
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
