import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { INote, IUpdateNote } from 'src/common/interfaces/notes';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  async findAll(): Promise<{ notes: Array<INote> }> {
    const notes = (await this.noteService.findAll()) as unknown as INote[];
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
  async createUser(@Body() note: INote): Promise<{ note: INote }> {
    const newUser = (await this.noteService.createOne(
      note,
    )) as unknown as INote;
    return { note: newUser };
  }

  @Delete()
  @HttpCode(204)
  async deleteUser(@Param() id: string): Promise<null> {
    await this.noteService.deleteOne(id);
    return null;
  }

  @Patch(':id')
  async updateUser(
    @Body() Body: IUpdateNote,
    @Param('id') id: string,
  ): Promise<{ note: INote }> {
    const updatedUser = await this.noteService.updateOne(Body, id);
    return { note: updatedUser };
  }
}
