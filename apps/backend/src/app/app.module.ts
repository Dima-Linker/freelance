import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { JobsController } from './jobs/jobs.controller';
import { JobsService } from './jobs/jobs.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, PrismaModule, JobsModule, AuthModule],
  controllers: [AppController, JobsController, AuthController],
  providers: [AppService, JobsService, AuthService],
})
export class AppModule {}
