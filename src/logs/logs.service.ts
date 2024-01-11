import { Injectable } from '@nestjs/common';
import { GetLogsInput } from './dto/get-logs.input';
import * as Exceptions from '@nestjs/common/exceptions';
import { ServerConfig } from 'src/config/configs/server.config';
import { ConfigService } from 'src/config/config.service';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';

@Injectable()
export class LogsService {
  private readonly serverConfig: ServerConfig;
  private readonly APX_CHUNK_SIZE: number;

  constructor(private readonly configService: ConfigService) {
    this.serverConfig = this.configService.getConfig().server;
    this.APX_CHUNK_SIZE = 1024;
  }

  async getLogs(getLogsInput: GetLogsInput): Promise<string[]> {
    const { filename, nrRows, searchQuery } = getLogsInput;
    const filePath = path.join(this.serverConfig.folderLocation, filename);

    const logs: string[] = [];
    try {
      const fileSize = fs.statSync(filePath).size;
      const startPosition = Math.max(
        0,
        fileSize - nrRows * this.APX_CHUNK_SIZE,
      );

      return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(filePath, {
          encoding: 'utf8',
          start: startPosition,
        });
        const readlineOutput = readline.createInterface({
          input: fileStream,
          crlfDelay: Infinity,
        });

        readlineOutput.on('line', (line) => {
          if (searchQuery && !line.includes(searchQuery)) {
            return;
          }
          logs.unshift(line);
          if (nrRows && logs.length > nrRows) {
            logs.pop();
          }
        });

        readlineOutput.on('close', () => {
          resolve(logs);
        });

        readlineOutput.on('error', (err) => {
          reject(err);
        });
      });
    } catch (error) {
      throw new Exceptions.InternalServerErrorException(
        `Error on reading file: ${error}`,
      );
    }
  }
}
