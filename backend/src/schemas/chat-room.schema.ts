import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User, UserSchema } from './user.schema';

export type ChatRoomDocument = HydratedDocument<ChatRoom>;

export enum ChatType {
  TEXT = 'text',
  MULTIMEDIA = 'multimedia',
}

@Schema()
export class Chat {
  @Prop({ required: true, type: UserSchema })
  sender: Partial<User>;

  @Prop({ required: true, enum: ChatType, default: ChatType.TEXT })
  type: ChatType;

  @Prop({ required: true })
  content: string;

  @Prop()
  sent_at: Date | null;

  @Prop()
  read_at: Date | null;
}
export const ChatSchema = SchemaFactory.createForClass(Chat);

@Schema()
export class ChatRoom {
  @Prop({ required: true, type: [UserSchema] })
  participants: User[];

  @Prop({ required: true, type: [ChatSchema] })
  chats: Chat[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
