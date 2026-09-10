import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return ({ message: 'Hello API gehts dir gut ' });
  }

  getUsers(): string {
    return 'This action returns all users';
  }
}
