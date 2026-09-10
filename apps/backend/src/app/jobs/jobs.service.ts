import { Injectable } from '@nestjs/common';
import {PrismaService} from "../db/prisma/prisma.service";
import {CreateJobDto} from "./dto/create-job.dto";

@Injectable()
export class JobsService {

  constructor(private readonly prismaService: PrismaService) {}

  async createJob(createJobDto: CreateJobDto) {
    return this.prismaService.Job.create({
      title: createJobDto.title,
      description: createJobDto.description,
      remote: createJobDto.remote,
      workYears: createJobDto.workYears,
      budgetMin: createJobDto.budgetMin,
      budgetMax: createJobDto.budgetMax,
    });
  }
}


