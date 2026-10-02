import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createJob(
    @Body() createJobDto: CreateJobDto,
    @Req() request: { user: { sub: string } },
  ) {
    return this.jobsService.createJob(createJobDto, request.user.sub);
  }

  @Get()
  getJobs() {
    return this.jobsService.getJobs();
  }

  @Get(':id')
  getJobById(@Param('id') id: string) {
    return this.jobsService.getJobById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateJob(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.updateJob(id, updateJobDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteJob(@Param('id') id: string) {
    return this.jobsService.deleteJob(id);
  }
}
