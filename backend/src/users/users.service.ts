import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from './models/dto/create.user';
import { hashPassword } from 'src/common/password';
import { RequestContext } from 'src/context/request-context';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hash = hashPassword(createUserDto.password);
    const createdCat = new this.userModel({
      ...createUserDto,
      active: true,
      password: hash,
    });
    const res = await createdCat.save();
    return res;
  }

  async getUser() {
    const { user } = RequestContext.getContext();
    return user;
  }
}
