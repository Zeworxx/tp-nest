import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({})
export class ConfigModule {
  static register(options: Record<string, string>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(options),
        },
      ],
      exports: [ConfigService],
    };
  }
}
