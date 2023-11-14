import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom, ChatRoomDocument, Chat } from 'src/schemas/chat-room.schema';
import { ChatRoomDto } from '../models/dto/create.chat';
import awaitToError from 'src/common/await-to-error';
import { User, UserDocument } from 'src/schemas/user.schema';
import { RequestContext } from 'src/context/request-context';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(ChatRoom.name)
    private readonly chatRoomModel: Model<ChatRoomDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async sendChat(data: ChatRoomDto) {
    const { user } = RequestContext.getContext();
    const [, users] = await awaitToError(
      this.userModel.find({
        username: {
          $in: [...data.receiver.map((d) => d.username), user.username],
        },
      }),
    );
    const participants = users.map((d) => ({
      username: d.username,
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
    }));
    const [, existingChatRoom] = await awaitToError(
      this.chatRoomModel.findOne({
        'participants.username': {
          $all: [...participants.map((d) => d.username)],
        },
      }),
    );
    const chats: Chat = {
      content: data.content,
      sender: { username: user.username },
      sent_at: new Date(),
      read_at: null,
      type: data.type,
    };
    if (existingChatRoom) {
      const [errPushedChat, pushedChat] = await awaitToError(
        this.chatRoomModel.findOneAndUpdate(
          {
            _id: existingChatRoom.id,
          },
          {
            $push: { chats },
          },
          { upsert: true },
        ),
      );
      if (errPushedChat) {
        throw errPushedChat;
      }
      return pushedChat;
    }
    const chatRoom = new this.chatRoomModel({ participants, chats });
    await chatRoom.save();
    return chatRoom;
  }

  async fetchChatRooms() {
    const { user } = RequestContext.getContext();
    const [err, existingChatRoom] = await awaitToError(
      this.chatRoomModel.find({
        'participants.username': { $in: user.username },
      }),
    );
    if (err) {
      throw new NotFoundException('no chats');
    }
    return existingChatRoom.map((d) => ({
      participants: d.participants,
      _id: d._id,
    }));
  }

  async getChatRooms(id: string) {
    const { user } = RequestContext.getContext();
    const [err, existingChatRoom] = await awaitToError(
      this.chatRoomModel.findOne({
        'participants.username': { $in: user.username },
        _id: id,
      }),
    );
    if (err) {
      throw new NotFoundException('no chat');
    }
    return existingChatRoom;
  }

  async deleteChatRoom(id: string) {
    const { user } = RequestContext.getContext();
    await awaitToError(
      this.chatRoomModel.deleteOne({
        'participants.username': { $in: user.username },
        _id: id,
      }),
    );
  }
}
