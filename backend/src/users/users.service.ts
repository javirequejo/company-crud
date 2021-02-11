import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository'
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async findAll() {
        return await this.userRepository.find();
    }

    async create(userDto: UserDto) {
        return await this.userRepository.createUser(userDto);
    }
}
