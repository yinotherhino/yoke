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

@Module({
  imports: [MongooseModule.forRoot(config.URI), AuthModule, NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth', method: RequestMethod.PATCH },
        { path: 'auth', method: RequestMethod.DELETE },
        { path: 'auth', method: RequestMethod.GET },
      )
      .forRoutes('auth');
    consumer.apply(AuthMiddleware).forRoutes('notes');
  }
}
