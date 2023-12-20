import { Injectable } from '@nestjs/common';
import { GetLogsInput } from './dto/get-logs.input';
import * as Exceptions from '@nestjs/common/exceptions';
import { exec } from 'child_process';
import * as util from 'util';

@Injectable()
export class LogsService {
  private async executeCommand(command: string): Promise<string[]> {
    const pExec = util.promisify(exec);
    try {
      const { stdout } = await pExec(command, { encoding: 'utf8' });

      return stdout
        .split('\n')
        .filter((line) => line.trim() !== '')
        .reverse();
    } catch (error) {
      throw new Exceptions.InternalServerErrorException(
        `Child process error: ${error}`,
      );
    }
  }

  async getLogs(getLogsInput: GetLogsInput): Promise<string[]> {
    const { filename, nrRows, searchQuery } = getLogsInput;
    const filePath = `var/logs/${filename}`;

    let command = `tail -n ${nrRows} ${filePath}`;
    if (searchQuery) {
      command += ` | grep '${searchQuery}'`;
    }

    return this.executeCommand(command);
  }
}
