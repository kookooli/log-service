import { Controller, Query, Get } from '@nestjs/common';
import { LogsService } from './logs.service';
import { GetLogsInput } from './dto/get-logs.input';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('logs')
@ApiTags('Logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get logs is successfull',
    type: [String],
  })
  async getLogs(@Query() getLogsInput: GetLogsInput): Promise<string[]> {
    return this.logsService.getLogs(getLogsInput);
  }
}
