import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if (!authHeader) {
        throw new UnauthorizedException({
          message: "Foydalanuvchi authorizatsiyadan o'tmagan1",
        });
      }
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: "Foydalanuvchi authorizatsiyadan o'tmagandur",
        });
      }
      const user = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      req.user = user;
      const authService = new AuthService(
        new PrismaService(),
        new JwtService(),
      );
      async function check(id: number) {
        console.log(await authService.getOneUser(id));
        if (await authService.getOneUser(id)) {
          return true;
        }
        return false;
      }
      return check(user.sub);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi authorizatsiyadan o'tmagan3",
      });
    }
  }
}
