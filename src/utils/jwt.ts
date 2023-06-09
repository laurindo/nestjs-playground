import { JwtService } from '@nestjs/jwt';
import { Role } from './auth/role.enum';

export class JwtServiceUtil {
  private readonly jwtService = new JwtService();

  async getAccessToken(
    uuid: string,
    email: string,
    roles: Role[],
    isAdmin: boolean,
  ): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: uuid,
        email,
        roles,
        isAdmin,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return accessToken;
  }
}
