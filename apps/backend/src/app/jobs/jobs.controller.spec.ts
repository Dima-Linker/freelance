import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

jest.mock('./jobs.service', () => ({
  JobsService: jest.fn(),
}));

jest.mock('../auth/guards/jwt-auth.guard', () => ({
  JwtAuthGuard: jest.fn(),
}));

describe('JobsController', () => {
  let controller: JobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        { provide: JobsService, useValue: {} },
        { provide: JwtAuthGuard, useValue: {} },
      ],
    }).compile();

    controller = module.get<JobsController>(JobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
