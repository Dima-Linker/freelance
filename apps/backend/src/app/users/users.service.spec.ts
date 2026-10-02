import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../db/prisma/prisma.service';

jest.mock('../db/prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => ({
    User: { all: jest.fn(), where: jest.fn() },
  })),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
