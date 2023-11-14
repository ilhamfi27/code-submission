import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './application/rest/user.controller';

@Module({
  controllers: [UserController],
  imports: [],
  providers: [UsersService],
})
export class UsersModule {}
