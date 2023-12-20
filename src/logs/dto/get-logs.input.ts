import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetLogsInput {
  @ApiProperty({
    description: 'Provide the name of the file',
    example: 'test-log-file.log',
  })
  @IsNotEmpty()
  @IsString()
  filename: string;

  @ApiProperty({
    description: 'Fetch only a limited nr of rows',
    example: 30,
  })
  @IsNumberString()
  nrRows: number;

  @ApiProperty({
    description: 'Provide a search query',
    example: 'WARNING',
    required: false,
  })
  @IsOptional()
  @IsString()
  searchQuery?: string;
}
