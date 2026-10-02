import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './db/prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, PrismaModule, JobsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
