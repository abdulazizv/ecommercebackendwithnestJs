import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('users')
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Get('users/:id')
  getOneUser(@Param('id') id: number) {
    return this.authService.getOneUser(id);
  }

  @Post('register')
  userRegister(@Body() userBody: CreateUserDto) {
    return this.authService.userRegistration(userBody);
  }

  @Post('login')
  userLogin(@Body() userBody: CreateUserDto) {
    return this.authService.userLogin(userBody);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: number, @Body() userBody: UpdateUserDto) {
    return this.authService.updateUser(id, userBody);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
