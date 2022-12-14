import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from '../users/dto/update-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUsers() {
    const users = await this.prismaService.user.findMany();
    if (!users.length) {
      throw new BadRequestException('users not found or table is empty');
    }
    return users;
  }

  async getOneUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: +id },
    });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    return user;
  }

  async userRegistration(userBody: CreateUserDto) {
    const candidate = await this.prismaService.user.findMany({
      where: { name: userBody.name },
    });
    if (candidate.length) {
      throw new BadRequestException('User already exists, Bunday user mavjud');
    }
    const hashedPassword = await bcrypt.hash(userBody.password, 7);
    const newUser = await this.prismaService.user.create({
      data: { name: userBody.name, password: hashedPassword },
    });
    const tokens = await this.getTokens(
      newUser.id,
      newUser.name,
      newUser.password,
    );

    return { newUser, tokens };
  }

  async userLogin(userBody: CreateUserDto) {
    const { name, password } = userBody;
    const user = await this.prismaService.user.findMany({ where: { name } });
    if (!user.length) {
      throw new UnauthorizedException('Ro`yhatdan o`tilmagan');
    }
    const passwordMatches = await bcrypt.compare(password, user[0].password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Ro`yhatdan o`tilmagan');
    }
    const tokens = await this.getTokens(
      user[0].id,
      user[0].name,
      user[0].password,
    );
    return { user, tokens };
  }

  async updateUser(id: number, userBody: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: +id },
    });
    if (!user) {
      throw new UnauthorizedException('Ro`yhatdan o`tilmagan');
    }
    const candidate = await this.prismaService.user.findMany({
      where: { name: userBody.name },
    });
    if (candidate.length && candidate[0].id != +id) {
      throw new BadRequestException('Bunday foydalanuvchi allaqachon mavjud');
    }
    const hashedPassword = await bcrypt.hash(userBody.password, 7);

    const updatedUser = await this.prismaService.user.update({
      where: { id: +id },
      data: { name: userBody.name, password: hashedPassword },
    });
    const tokens = await this.getTokens(
      updatedUser.id,
      updatedUser.name,
      updatedUser.password,
    );
    return { user: updatedUser, tokens };
  }

  async deleteUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: +id },
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.prismaService.user.delete({ where: { id: +id } });
    return { message: 'user deleted', user };
  }

  async getTokens(userId: number, name: string, password: string) {
    const jwtPayload = {
      sub: userId,
      name: name,
      password: password,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
