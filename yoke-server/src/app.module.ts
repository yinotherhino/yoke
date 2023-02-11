import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './common/config/config';

import { AuthMiddleware } from './common/middleware/auth';
import { NotesModule } from './notes/notes.module';
import { User, userSchema } from './schemas/user.schema';
import { Note, notesSchema } from './schemas/notes.schema';

@Module({
  imports: [
    MongooseModule.forRoot(config.URI),
    AuthModule,
    NotesModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: notesSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/signup', method: RequestMethod.POST },
      )
      .forRoutes('auth');
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'notes/:id', method: RequestMethod.GET })
      .forRoutes('notes');
  }
}
