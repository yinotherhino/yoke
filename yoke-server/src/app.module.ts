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
import config from './config/config';

import { AuthMiddleware } from './middleware/auth';

@Module({
  imports: [MongooseModule.forRoot(config.URI), AuthModule],
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
  }
}
