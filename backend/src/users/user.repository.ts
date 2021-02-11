import { UserDto } from './dto/user.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(userDto: UserDto): Promise<User> {
        const {name, email} = userDto;
        const user = new User();
        user.name = name;
        user.email = email;

        await this.checkIfEmailExists(email);
        await user.save();

        return user;
    }

    async checkIfEmailExists(email: string) {
        const result = await this.findOne({email: email});
        if(result) throw new HttpException({message: 'This email address already exists'}, HttpStatus.BAD_REQUEST);
    }
}