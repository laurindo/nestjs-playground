import { uuid } from 'uuidv4';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CredentialModel } from './credential.model';
import { Credential } from './credential.schema';
import { CredentialCreateDTO } from './credential.create.dto';
import { compare, encrypt } from 'src/utils/hashing';
import { ERROR_MSGS } from 'src/constants/errors';

@Injectable()
export class CredentialService {
  constructor(
    @InjectModel(Credential.name) private credentialModel: Model<Credential>,
  ) {}

  private readonly logger = new Logger(CredentialService.name);

  private async findOneByEmail(email: string): Promise<CredentialModel> {
    const result = await this.credentialModel.findOne({ email });
    return result;
  }

  async findOneById(uuid: string): Promise<CredentialModel> {
    return await this.credentialModel.findOne({ uuid });
  }

  async signin(
    createCredentialDto: CredentialCreateDTO,
  ): Promise<CredentialModel | { error: true; message: string }> {
    const result = await this.credentialModel.findOne({
      email: createCredentialDto.email,
    });

    const isPasswordOk = await compare(
      createCredentialDto.password,
      result.password,
    );

    if (result && isPasswordOk) {
      return { uuid: result.uuid, email: result.email };
    }

    this.logger.warn(`isPasswordOk: ${isPasswordOk}`);
    this.logger.warn(`isUserExists: ${!!result}`);
    throw new HttpException(ERROR_MSGS.FORBIDDEN, HttpStatus.FORBIDDEN);
  }

  async signup(
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
