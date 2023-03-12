import { AccessTokenGuard } from './../guards/accessToken.guard';
import {
  Body,
  Controller,
  Post,
  Res,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { User } from 'src/utils/decorators/user.decorator';
import { JWT, RefreshToken } from '../services/jwt.service';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/register')
  register(@Body() data: RegisterDto) {
    return this.AuthService.register(data);
  }

  @Post('/login')
  login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.AuthService.login(data, response);
  }

  @Get('/logout/:userId')
  logout(
    @Param('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.AuthService.logout(userId, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refreshToken')
  refreshToken(@User() data: JWT<RefreshToken>) {
    return this.AuthService.refreshToken(data.userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('persist')
  persistLogin(@User() data: JWT<RefreshToken>) {
    return this.AuthService.persistLogin(data.userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('verifyRF')
  verifyRFToken(@User() data: JWT<RefreshToken>) {
    return this.AuthService.verifyRFToken(data.userId);
  }
}
