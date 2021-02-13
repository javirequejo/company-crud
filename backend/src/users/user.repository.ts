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

    async findUserById(id: string) {
        const user = await this.findOne({ where: {id: id}});
        if(!user) throw new HttpException({message: `User with ID: ${id} not found`}, HttpStatus.BAD_REQUEST);
        return user;
    }

    async deleteCompanyRelations(companyId: string) {
        const usersWithCompany = await this.find({ where: { company: companyId}});
        if(usersWithCompany.length>0) {
            for(const user of usersWithCompany) {
                user.company = null;
                await user.save();
            }
        }
    }

    private async checkIfEmailExists(email: string) {
        const result = await this.findOne({email: email});
        if(result) throw new HttpException({message: 'This email address already exists'}, HttpStatus.BAD_REQUEST);
    }
}