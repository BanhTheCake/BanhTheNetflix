import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccessToken, JWT } from '../services/jwt.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'AccessToken',
) {
  constructor(ConfigService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigService.get('ACCESS_TOKEN'),
    });
  }

  async validate(payload: JWT<AccessToken>) {
    return { userId: payload.userId, username: payload.username };
  }
}
