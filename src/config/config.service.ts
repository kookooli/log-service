import { Injectable } from '@nestjs/common';
import serverConfig, { ServerConfig } from './configs/server.config';

export class Configuration {
  server: ServerConfig;
}

@Injectable()
export class ConfigService {
  private readonly configuration: Configuration;

  constructor() {
    this.configuration = this.loadConfig();
  }

  public getConfig(): Configuration {
    return this.configuration;
  }

  private loadConfig(): Configuration {
    return {
      server: serverConfig(),
    };
  }
}
