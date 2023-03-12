import { TokenService } from './jwt.service';
import { RegisterDto } from './../dto/register.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from 'src/Model/Entities/user.entity';
import { TR } from 'src/utils/type';
import { v4 as uuidv4 } from 'uuid';
import * as argon2 from 'argon2';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';
import { cookieConfig } from 'src/utils/config/cookie.config';

const handleError = (name: string, error) => {
  if (error.response) throw error;
  console.log('error at ' + name + ' :', error);
  throw new InternalServerErrorException('Something wrong with server !');
};

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS') private UsersModel: typeof Users,
    private TokenService: TokenService,
  ) {}

  async register(data: RegisterDto): Promise<TR> {
    try {
      const duplicateUser = await this.UsersModel.findOne({
        where: { username: data.username },
      });
      if (duplicateUser) {
        return {
          errCode: 1,
          msg: 'Username has been exist in out system',
        };
      }
      const hashPassword = await argon2.hash(data.password);
      const userCreate = { ...data, password: hashPassword, userId: uuidv4() };
      await this.UsersModel.create({ ...userCreate });
      return {
        errCode: 0,
        msg: 'Create account success !',
      };
    } catch (error) {
      handleError('register', error);
    }
  }

  async login(data: LoginDto, response: Response): Promise<TR> {
    try {
      const user = await this.UsersModel.findOne({
        where: { username: data.username },
      });
      if (!user) {
        return {
          errCode: 1,
          msg: 'Username or password is incorrect !',
        };
      }
      const isMatch = await argon2.verify(user.password, data.password);
      if (!isMatch) {
        return {
          errCode: 1,
          msg: 'Username or password is incorrect !',
        };
      }
      const accessToken = this.TokenService.genAccessToken({
        userId: user.userId,
        username: user.username,
      });
      const refreshToken = this.TokenService.genRefreshToken({
        userId: user.userId,
        username: user.username,
      });

      const plainUser = user.get({ plain: true }) as Users;
      delete plainUser.password;

      response.cookie('rfToken', refreshToken, cookieConfig);

      return {
        errCode: 0,
        msg: 'Login success !',
        data: {
          token: accessToken,
          user: plainUser,
        },
      };
    } catch (error) {
      handleError('Login', error);
    }
  }

  async logout(userId: string, res: Response): Promise<TR> {
    try {
      const user = await this.UsersModel.findOne({ where: { userId } });
      if (!user)
        throw new BadRequestException('User is not exist in out system');
      res.cookie('rfToken', null, cookieConfig);
      return {
        errCode: 0,
        msg: 'Logout success',
      };
    } catch (error) {
      handleError('logout', error);
    }
  }

  async refreshToken(userId: string): Promise<TR> {
    try {
      const user = await this.UsersModel.findOne({ where: { userId } });
      if (!user) throw new UnauthorizedException();
      const accessToken = this.TokenService.genAccessToken({
        userId: user.userId,
        username: user.username,
      });
      return {
        errCode: 0,
        msg: 'Ok',
        data: { token: accessToken },
      };
    } catch (error) {
      handleError('refreshToken', error);
    }
  }

  async persistLogin(userId: string): Promise<TR> {
    try {
      const user = await this.UsersModel.findOne({ where: { userId } });
      if (!user) throw new UnauthorizedException();
      const accessToken = this.TokenService.genAccessToken({
        userId: user.userId,
        username: user.username,
      });
      const plainUser = user.get({ plain: true }) as Users;
      delete plainUser.password;
      return {
        errCode: 0,
        msg: 'Ok',
        data: {
          token: accessToken,
          user: plainUser,
        },
      };
    } catch (error) {
      handleError('persistLogin', error);
    }
  }

  async verifyRFToken(userId: string): Promise<TR> {
    try {
      const user = await this.UsersModel.findOne({ where: { userId } });
      if (!user) throw new UnauthorizedException();
      return {
        errCode: 0,
        msg: 'Accept',
      };
    } catch (error) {
      handleError('verifyRFToken', error);
    }
  }
}
