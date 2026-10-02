import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { PrismaService } from '../db/prisma/prisma.service';

jest.mock('../db/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    Job: { all: jest.fn(), where: jest.fn() },
  })),
}));

describe('JobsService', () => {
  let service: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobsService, PrismaService],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
