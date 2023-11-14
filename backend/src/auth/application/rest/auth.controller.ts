import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/domain/auth.service';
import { LoginDto } from 'src/auth/models/dto/login';
import { CreateUserDto } from 'src/users/models/dto/create.user';
import { UsersService } from 'src/users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
