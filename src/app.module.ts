import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsModule } from './logs/logs.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [LogsModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
