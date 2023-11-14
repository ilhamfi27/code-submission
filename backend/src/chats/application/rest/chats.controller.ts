import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChatsService } from 'src/chats/domain/chats.service';
import { ChatRoomDto } from 'src/chats/models/dto/create.chat';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatsService) {}

  @Post('/')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  sendChat(@Body() data: ChatRoomDto) {
    return this.chatService.sendChat(data);
  }

  @Get('/rooms')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getMyChatRooms() {
    return this.chatService.fetchChatRooms();
  }

  @Get('/rooms/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  getMyChatRoom(@Param('id') id: string) {
    return this.chatService.getChatRooms(id);
  }

  @Delete('/rooms/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMyChatRoom(@Param('id') id: string) {
    return this.chatService.deleteChatRoom(id);
  }
}
