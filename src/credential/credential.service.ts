import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CredentialModel } from './credential.model';
import { Credential } from './credential.schema';
import { CredentialCreateDTO } from './credential.create.dto';
import { encrypt } from 'src/utils/hashing';

@Injectable()
export class CredentialService {
  constructor(
    @InjectModel(Credential.name) private credentialModel: Model<Credential>,
  ) {}

  async findOneById(uuid: string): Promise<CredentialModel> {
    return await this.credentialModel.findOne({ uuid });
  }

  async findOneByEmail(email: string): Promise<CredentialModel> {
    const result = await this.credentialModel.findOne({ email });
    return result;
  }

  async create(
    createCredentialDto: CredentialCreateDTO,
  ): Promise<CredentialModel> {
    const hasCredential = await this.findOneByEmail(createCredentialDto.email);

    if (hasCredential) {
      return Promise.resolve({ email: createCredentialDto.email });
    }

    const credential = new this.credentialModel({
      ...createCredentialDto,
      password: await encrypt(createCredentialDto.password),
      uuid: uuid(),
    });
    return credential.save();
  }
}
