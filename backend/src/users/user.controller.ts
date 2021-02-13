import { ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import { Body, Controller, Get, Post, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
  async create(@Body() userDto: UserDto) {
    return await this.usersService.create(userDto);
  }
}
