import { ForbiddenException, Inject, Injectable, Logger } from "@nestjs/common";
import { IUser } from "@shared/types/user.types";
import { FastifyReply } from "fastify";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import * as jwt from 'jsonwebtoken';
import AppConfig from "@server/app.config";
import { ConfigType } from "@nestjs/config";
import { UserDocument } from "../user/user.schema";

@Injectable()
export class AuthService {
  constructor(
    readonly userService: UserService,

    @Inject(AppConfig.KEY)
    readonly appConfig: ConfigType<typeof AppConfig>,
  ) {}

  async signup(user: IUser) {
    try {
      const signedupUser = await this.userService.createUser({
        password: user.password,
        lastName: user.lastName,
        firstName: user.firstName,
        username: user.username,
      });
      return signedupUser;
    } catch (er) {
      Logger.error(er, 'AuthService:signup');
      return {};
    }
  }

  signToken(userId: string) {
    return jwt.sign({ userId }, this.appConfig.jwtSecret, {
      expiresIn: this.appConfig.jwtExpiresIn
    });
  }

  async login(response: FastifyReply, loginInfo: LoginDto) {
    try {
      const { username, password } = loginInfo;
      const user = await this.userService
        .getUserByPhoneOrUsername(username);

      // if (user.isActive && (await user.checkPassword(user.password, password))) {
      if (!user || !(await user.checkPassword(user.password, password))) {
        throw new ForbiddenException('Incorrect username or password');
      }

      delete user['password'];

      response.setCookie('authToken', this.signToken(user.id), {
        path: '/'
      });

      return user;
    } catch (er) {
      Logger.error(er, 'AuthService:login');
      return {} as UserDocument;
    }
  }
}