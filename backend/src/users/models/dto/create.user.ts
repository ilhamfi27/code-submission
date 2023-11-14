import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  username: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  password: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  lastName: string;
}
