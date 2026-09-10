import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../db/prisma/prisma.service";
import {UpdateUserDto} from "./dto/update-user.dto";


@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.User.all();
  }

  async getUser(id: string) {
    const user = await this.prisma.User
      .where({ id })
      .first();

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.User
      .where({ id })
      .update({
        name: updateUserDto.name,
        email: updateUserDto.email,
      });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async deleteUser(id: string) {
    const deleteUser = await this.prisma.User
    .where({ id })
    .delete();
    if (!deleteUser) {
      throw new NotFoundException('User does not exist');
    }
    return deleteUser;
  }
}

