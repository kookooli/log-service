import { Controller, Query, Get } from '@nestjs/common';
import { LogsService } from './logs.service';
import { GetLogsInput } from './dto/get-logs.input';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  async getLogs(@Query() getLogsInput: GetLogsInput): Promise<string[]> {
    return this.logsService.getLogs(getLogsInput);
  }
}
