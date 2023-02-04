import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@server/guards/auth.guard';
import { IUser } from '@shared/types/user.types';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(
    readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('ADMIN', 'MAINTAINER'))
  getAllUsers(@Query() query: Record<string, string>) {
    return this.userService.getAllUsers(query);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('ADMIN', 'MAINTAINER'))
  getSingleUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Patch('/:id') 
  @UseGuards(AuthGuard('ADMIN'))
  updateUser(
    @Param('id') id: string, 
    @Body('user') user: Partial<IUser>
  ) {
    return this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('ADMIN'))
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post()
  @UseGuards(AuthGuard('ADMIN'))
  createUser(@Body('user') user: IUser) {
    return this.userService.createUser(user);
  }
}
