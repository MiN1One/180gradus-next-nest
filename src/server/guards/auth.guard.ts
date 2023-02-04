import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import AppConfig from "@server/app.config";
import { ConfigType } from "@nestjs/config";
import { UserService } from "@server/modules/user/user.service";
import { UserRoleType } from "@shared/types/user.types";
import { FastifyReply } from "fastify";

export function AuthGuard(...roles: UserRoleType[]) {
  @Injectable()
  class AuthGuard implements CanActivate {
    constructor(
      @Inject(AppConfig.KEY)
      readonly appConfig: ConfigType<typeof AppConfig>,
      
      @Inject(UserService)
      readonly userService: UserService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      try {
        const { cookies } = request;
        
        if (!cookies.authToken) {
          return false;
        }
    
        const decodedToken = jwt.verify(
          cookies.authToken, 
          this.appConfig.jwtSecret
        ) as {
          userId: string;
          iat: number;
          exp: number;
        };
    
        const user = await this.userService.getUser(decodedToken.userId);

        if (
          !user || 
          user.passwordChanged(decodedToken.iat) ||
          (roles.length && !roles.includes(user.role))
        ) {
          return false;
        }
    
        request.user = user;
    
        return true;
      } catch (er) {
        if ('expiredAt' in er) {
          const response = context.switchToHttp().getResponse() as FastifyReply;
          await response.redirect(302, `/login`);
          return;
        }
        Logger.error(er, 'AuthGuard');
        return false;
      }
    }
  }
  return AuthGuard;
}