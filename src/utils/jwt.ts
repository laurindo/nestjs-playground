import { JwtService } from '@nestjs/jwt';

export class JwtServiceUtil {
  private readonly jwtService = new JwtService();

  async getAccessToken(uuid: string, email: string): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: uuid,
        email,
      },
      {
        secret: process.env.JWT_SECRET,
      },
    );

    return accessToken;
  }
}
