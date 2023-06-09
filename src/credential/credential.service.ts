import { uuid as uuidv4 } from 'uuidv4';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Injectable,
  Logger,
} from '@nestjs/common';
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
    return result.toJSON();
  }

  async findByEmail(email: string): Promise<CredentialModel> {
    return (await this.credentialModel.findOne({ email })).toJSON();
  }

  async signin(
    createCredentialDto: CredentialCreateDTO,
  ): Promise<CredentialModel> {
    const resultFromDatabase = await this.credentialModel.findOne({
      email: createCredentialDto.email,
    });

    const isPasswordOk = await compare(
      createCredentialDto.password,
      resultFromDatabase.password,
    );

    if (resultFromDatabase && isPasswordOk) {
      const accessToken = await this.jwtServiceUtil.getAccessToken(
        resultFromDatabase.uuid,
        resultFromDatabase.email,
        resultFromDatabase.roles,
        resultFromDatabase.isAdmin,
      );
      const { password, ...signinResponse } = resultFromDatabase;

      return { ...signinResponse, accessToken };
    }

    this.logger.warn(`isPasswordOk: ${isPasswordOk}`);
    this.logger.warn(`isUserExists: ${!!resultFromDatabase}`);
    throw new UnauthorizedException();
  }

  async signup(
    createCredentialDto: CredentialCreateDTO,
  ): Promise<CredentialModel> {
    this.logger.log(`searching credential on database...`);

    const hasCredential = await this.findOneByEmail(createCredentialDto.email);

    this.logger.warn(`credential found: ${hasCredential}`);

    if (hasCredential) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    this.logger.log(`payload to create creedntial: ${createCredentialDto}`);
    const uuid = uuidv4();
    const accessToken = await this.jwtServiceUtil.getAccessToken(
      uuid,
      createCredentialDto.email,
      createCredentialDto.roles,
      createCredentialDto.isAdmin,
    );

    this.logger.warn(`generated accessToken`);

    const credential = new this.credentialModel({
      ...createCredentialDto,
      password: await encrypt(createCredentialDto.password),
      accessToken,
      uuid,
    });

    this.logger.warn(
      `generated credential data to save on database: ${credential}`,
    );

    await credential.save();

    this.logger.warn(`credential saved on database`);

    const { password, ...signupResponse } = credential;
    return signupResponse;
  }
}
