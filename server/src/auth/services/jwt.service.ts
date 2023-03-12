import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export type AccessToken = {
  userId: string;
  username: string;
};

export type RefreshToken = {
  userId: string;
  username: string;
};

export type JWT<T> = T & {
  iat: string;
  exp: string;
};

@Injectable()
export class TokenService {
  constructor(
    private JwtService: JwtService,
    private configService: ConfigService,
  ) {}

  genAccessToken(payload: AccessToken) {
    return this.JwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EX'),
    });
  }

  genRefreshToken(payload: RefreshToken) {
    return this.JwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EX'),
    });
  }
}
