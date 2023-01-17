import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IUser } from '@shared/types/user.types';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(
    readonly userService: UserService,
  ) {}

  @Get()
  getAllUsers(@Query() query: Record<string, string>) {
    return this.userService.getAllUsers(query);
  }

  @Get('/:id')
  getSingleUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Patch('/:id') 
  updateUser(
    @Param('id') id: string, 
    @Body('user') user: Partial<IUser>
  ) {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post()
  createUser(@Body('user') user: IUser) {
    return this.userService.createUser(user);
  }
}
