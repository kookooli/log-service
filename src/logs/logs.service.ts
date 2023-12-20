import { Injectable } from '@nestjs/common';
import { GetLogsInput } from './dto/get-logs.input';
import * as Exceptions from '@nestjs/common/exceptions';
import { exec } from 'child_process';
import * as util from 'util';
import { ServerConfig } from 'src/config/configs/server.config';
import { ConfigService } from 'src/config/config.service';
import * as path from 'path';

@Injectable()
export class LogsService {
  private readonly serverConfig: ServerConfig;

  constructor(private readonly configService: ConfigService) {
    this.serverConfig = this.configService.getConfig().server;
  }

  private async executeCommand(command: string): Promise<string[]> {
    const pExec = util.promisify(exec);
    try {
      const { stdout } = await pExec(command, { encoding: 'utf8' });

      return stdout
        .split('\n')
        .filter((line) => line.trim() !== '')
        .reverse();
    } catch (error) {
      if (error?.code === 1 && error?.stdout === '' && error?.stderr === '')
        return ['    ************   NO RESULTS  ************    '];
      else if (error.stderr.includes('No such file or directory'))
        throw new Exceptions.NotFoundException('File not found.');
      else
        throw new Exceptions.InternalServerErrorException(
          `Child process error: ${error}`,
        );
    }
  }

  async getLogs(getLogsInput: GetLogsInput): Promise<string[]> {
    const { filename, nrRows, searchQuery } = getLogsInput;
    const filePath = path.join(this.serverConfig.folderLocation, filename);

    let command = `tail -n ${nrRows} ${filePath}`;
    if (searchQuery) {
      command += ` | grep '${searchQuery}'`;
    }

    return this.executeCommand(command);
  }
}
