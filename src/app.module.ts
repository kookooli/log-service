import { Module } from '@nestjs/common';
import { LogsModule } from './logs/logs.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [LogsModule, ConfigModule],
})
export class AppModule {}
