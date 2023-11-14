import { Module } from '@nestjs/common';
import { ChatsService } from './domain/chats.service';
import { ChatController } from './application/rest/chats.controller';

@Module({
  controllers: [ChatController],
  providers: [ChatsService],
})
export class ChatsModule {}
