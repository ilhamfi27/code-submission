import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomSchema } from 'src/schemas/chat-room.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({})
export class MongodbModule {
  static schemas(): ModelDefinition[] {
    return [
      { name: User.name, schema: UserSchema },
      { name: ChatRoom.name, schema: ChatRoomSchema },
    ];
  }

  static forRoot(): DynamicModule {
    return {
      global: true,
      module: MongodbModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) => {
            const host = config.get<string>('MONGODB_HOST');
            const port = config.get<number>('MONGODB_PORT');
            const username = config.get<string>('MONGODB_USERNAME');
            const password = config.get<string>('MONGODB_PASSWORD');
            const db = config.get<string>('MONGODB_DB');
            const uri = `mongodb://${username}:${password}@${host}:${port}/${db}`;

            return {
              uri,
              authSource: config.get<string>('MONGODB_AUTH_SOURCE'),
            };
          },
        }),
        MongooseModule.forFeature(this.schemas()),
      ],
      exports: [MongooseModule.forFeature(this.schemas())],
    };
  }
}
