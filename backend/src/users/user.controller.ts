import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): any {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }
}
