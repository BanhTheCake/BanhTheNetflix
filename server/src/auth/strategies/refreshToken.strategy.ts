import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT, RefreshToken } from '../services/jwt.service';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'RefreshToken',
) {
  constructor(ConfigService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.getTokenFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get('REFRESH_TOKEN'),
    });
  }

  static getTokenFromCookie(req: Request) {
    const { rfToken } = req.cookies;
    if (!rfToken) throw new UnauthorizedException();
    return rfToken;
  }

  async validate(payload: JWT<RefreshToken>) {
    return { userId: payload.userId, username: payload.username };
  }
}
