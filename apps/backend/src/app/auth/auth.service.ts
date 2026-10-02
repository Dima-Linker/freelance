import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../db/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prismaService.User.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.User.where({
      email: loginDto.email,
    }).first();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user);

    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, token };
  }

  generateToken = (user: { email: string; id: string }) => {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  };
}
