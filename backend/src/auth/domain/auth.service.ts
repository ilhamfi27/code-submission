import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../models/dto/login';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import awaitToError from 'src/common/await-to-error';
import { comparePassword } from 'src/common/password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async login(data: LoginDto) {
    const [err, user] = await awaitToError(
      this.userModel.findOne({
        username: data.username,
      }),
    );
    if (err || !user) {
      throw new NotFoundException('user not found');
    }
    const isMatch = comparePassword(user.password, data.password);
    if (!isMatch) {
      throw new UnauthorizedException('wrong username or password');
    }
    const payload = {
      sub: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }

  async verify(token: string) {
    const payload =
      await this.jwtService.verifyAsync<Partial<User & { sub: string }>>(token);
    const [err, user] = await awaitToError(
      this.userModel.findOne(
        {
          username: payload.sub,
        },
        { password: 0, __v: 0 },
      ),
    );
    if (err || !user) {
      throw new ForbiddenException('forbidden');
    }
    return user;
  }
}
