import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ChatType } from 'src/schemas/chat-room.schema';

export class UserChatDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  username: string;
}

export class ChatRoomDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  content: string;

  @ApiProperty({
    required: true,
    enum: ChatType,
    default: ChatType.TEXT,
  })
  @IsString()
  type: ChatType;

  @ApiProperty({
    required: true,
    type: [UserChatDto],
  })
  @IsString()
  receiver: UserChatDto[];
}
