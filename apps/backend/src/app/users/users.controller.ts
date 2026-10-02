import {Body, Controller, Delete, Get, Param, Patch, Req, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() request: { user: { sub: string } }) {
    return this.usersService.getMe(request.user.sub);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
