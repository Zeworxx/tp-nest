import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const options: Record<string, string> = {
  dbType: 'json', // Better to use .env, Just for th example !
};

@Module({
  imports: [ConfigModule.register(options)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
