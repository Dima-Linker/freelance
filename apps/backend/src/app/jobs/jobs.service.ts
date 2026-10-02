import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getJobs() {
    return this.prismaService.Job.all();
  }

  async getJobById(id: string) {
    const job = await this.prismaService.Job.where({ id }).first();
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async createJob(createJobDto: CreateJobDto, clientId: string) {
    return this.prismaService.Job.create({
      title: createJobDto.title,
      description: createJobDto.description,
      remote: createJobDto.remote,
      workYears: createJobDto.workYears,
      budgetMin: createJobDto.budgetMin,
      budgetMax: createJobDto.budgetMax,
      clientId,
    });
  }

  async updateJob(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.prismaService.Job.where({ id }).first();

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return this.prismaService.Job.where({ id }).update({
      title: updateJobDto.title,
      description: updateJobDto.description,
      remote: updateJobDto.remote,
      workYears: updateJobDto.workYears,
      budgetMin: updateJobDto.budgetMin,
      budgetMax: updateJobDto.budgetMax,
    });
  }

  async deleteJob(id: string) {
    const job = await this.prismaService.Job.where({ id }).first();

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return this.prismaService.Job.where({ id }).delete();
  }
}
