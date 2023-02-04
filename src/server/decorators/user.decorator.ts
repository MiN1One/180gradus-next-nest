import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IUser } from "@shared/types/user.types";

export const User = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user || {} as IUser;
  }
);