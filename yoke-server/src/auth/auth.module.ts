import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../schemas/user.schema';
import { Note, notesSchema } from 'src/schemas/notes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: notesSchema }]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
