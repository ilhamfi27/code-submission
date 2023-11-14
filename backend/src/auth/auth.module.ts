import { Module } from '@nestjs/common';
import { AuthController } from './application/rest/auth.controller';
import { AuthService } from './domain/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
