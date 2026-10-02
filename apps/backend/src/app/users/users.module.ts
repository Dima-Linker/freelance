import { Module } from '@nestjs/common';
import {PrismaModule} from "../db/prisma/prisma.module";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
