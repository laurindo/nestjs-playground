import { uuid as uuidv4 } from 'uuidv4';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserModel } from './user.model';
import { User } from './user.schema';
import { UserInput } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private readonly logger = new Logger(UserService.name);

  private async findUser(credentialUuid: string): Promise<UserModel> {
    const result = await this.userModel.findOne({ credentialUuid });
    return result;
  }

  async create(userInputDTO: UserInput): Promise<UserModel> {
    this.logger.log('querying user in database...');
    const hasUser = await this.findUser(userInputDTO.credentialUuid);

    if (hasUser) {
      this.logger.log('user already exist...');
      return Promise.resolve(hasUser);
    }

    this.logger.log('user not found in DB, creating user...');
    const uuid = uuidv4();
    const userCreatedResponse = new this.userModel({
      ...userInputDTO,
      uuid,
    });

    return userCreatedResponse.save();
  }
}
