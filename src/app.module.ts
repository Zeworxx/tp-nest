import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from './config/config.module';
import { UserMiddleware } from './middleware/user.middleware';
import { UserModule } from './user/user.module';

const options: Record<string, string> = {
  environment: 'dev', // Better to use .env, Just for th example !
};

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    UserModule,
    ConfigModule.register(options),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
