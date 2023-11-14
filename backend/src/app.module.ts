import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { getConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './auth/application/middleware/auth.middleware';
import { AuthService } from './auth/domain/auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ChatsModule } from './chats/chats.module';
import { MongodbModule } from './mongodb/mongodb.module';

@Module({
  providers: [AuthService],
  imports: [
    getConfigModule(),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        return {
          global: true,
          secret:
            config.get<string>('JWT_SECRET') ??
            'abcdefghijklmnopqrstuvwxyz123456',
        };
      },
    }),
    MongodbModule.forRoot(),
    AuthModule,
    UsersModule,
    ChatsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/register', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/docs', method: RequestMethod.GET },
      )
      .forRoutes(`*`);
  }
}
