import { Body, Controller, Post, Res } from "@nestjs/common";
import { IUser } from "@shared/types/user.types";
import { AuthService } from "./auth.service";
import { changePasswordDto } from "./dto/change-password.dto";
import { LoginDto } from "./dto/login.dto";
import { FastifyReply } from 'fastify';

@Controller('api/auth')
export class AuthController {

  constructor(
    readonly authService: AuthService,
  ) {}

  @Post('login')
  login(
    @Body('loginInfo') loginInfo: LoginDto,
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    return this.authService.login(res, loginInfo);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: FastifyReply) {
    res.clearCookie('authToken');
  }

  @Post('change-password')
  changePassword(
    @Body('changePasswordInfo') changePasswordInfo: changePasswordDto
  ) {
    
  }

  @Post('signup')
  signup(@Body('user') user: IUser) {
    return this.authService.signup(user);
  }
}