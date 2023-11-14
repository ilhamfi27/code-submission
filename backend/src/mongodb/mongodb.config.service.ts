import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  //You can retrun promise as well
  public createMongooseOptions(): MongooseModuleOptions {
    const host = this.config.get<string>('MONGODB_HOST');
    const port = this.config.get<number>('MONGODB_PORT');
    const username = this.config.get<string>('MONGODB_USERNAME');
    const password = this.config.get<string>('MONGODB_PASSWORD');
    const db = this.config.get<string>('MONGODB_DB');
    const uri = `mongodb://${username}:${password}@${host}:${port}/${db}`;
    return {
      uri: uri,
      authSource: this.config.get<string>('MONGODB_AUTH_SOURCE'),
    };
  }
}
