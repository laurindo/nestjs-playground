import { uuid as uuidv4 } from 'uuidv4';
import { UnauthorizedException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CredentialModel } from './credential.model';
import { Credential } from './credential.schema';
import { CredentialCreateDTO } from './credential.create.dto';
import { compare, encrypt } from 'src/utils/hashing';
import { JwtServiceUtil } from 'src/utils/jwt';

@Injectable()
export class CredentialService {
  constructor(
    @InjectModel(Credential.name) private credentialModel: Model<Credential>,
  ) {}

  private readonly logger = new Logger(CredentialService.name);
  private jwtServiceUtil = new JwtServiceUtil();

  private async findOneByEmail(email: string): Promise<CredentialModel> {
    const result = await this.credentialModel.findOne({ email });
    return result;
  }

  async findByEmail(email: string): Promise<CredentialModel> {
    return await this.credentialModel.findOne({ email });
  }

  async signin(
    createCredentialDto: CredentialCreateDTO,
  ): Promise<CredentialModel> {
    const result = await this.credentialModel.findOne({
      email: createCredentialDto.email,
    });

    const isPasswordOk = await compare(
      createCredentialDto.password,
      result.password,
    );

    if (result && isPasswordOk) {
      const accessToken = await this.jwtServiceUtil.getAccessToken(
        result.uuid,
        result.email,
      );
      return { uuid: result.uuid, email: result.email, accessToken };
    }

    this.logger.warn(`isPasswordOk: ${isPasswordOk}`);
    this.logger.warn(`isUserExists: ${!!result}`);
    throw new UnauthorizedException();
  }

  async signup(
    createCredentialDto: CredentialCreateDTO,
  ): Promise<CredentialModel> {
    const hasCredential = await this.findOneByEmail(createCredentialDto.email);

    if (hasCredential) {
      const accessToken = await this.jwtServiceUtil.getAccessToken(
        hasCredential.uuid,
        createCredentialDto.email,
      );
      return Promise.resolve({ email: createCredentialDto.email, accessToken });
    }

    const uuid = uuidv4();
    const accessToken = await this.jwtServiceUtil.getAccessToken(
      uuid,
      createCredentialDto.email,
    );

    const credential = new this.credentialModel({
      ...createCredentialDto,
      password: await encrypt(createCredentialDto.password),
      accessToken,
      uuid,
    });

    return credential.save();
  }
}
