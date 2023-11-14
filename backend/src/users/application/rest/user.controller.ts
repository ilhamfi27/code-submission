import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('/me')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  register() {
    return this.userService.getUser();
  }
}
