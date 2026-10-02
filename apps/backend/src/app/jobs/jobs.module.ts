import {Module} from "@nestjs/common";
import {PrismaModule} from "../db/prisma/prisma.module";
import {JobsController} from "./jobs.controller";
import {JobsService} from "./jobs.service";
import {AuthModule} from "../auth/auth.module";


@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {

}
