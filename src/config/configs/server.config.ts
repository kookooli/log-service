import { makeEnv, parsers } from '@strattadb/environment';

export interface ServerConfig {
  folderLocation: string;
}

export default function serverConfig(): ServerConfig {
  return makeEnv({
    folderLocation: {
      parser: parsers.string,
      required: false,
      defaultValue: 'var/logs/',
      envVarName: 'FOLDER_LOCATION',
    },
  });
}
