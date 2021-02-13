import { User } from './../users/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository'
import { UserRepository } from './../users/user.repository';
import { CompanyDto } from './dto/company.dto';
import { Company } from './company.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyRepository)
        private companyRepository: CompanyRepository,

        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async findAll(): Promise<Company[]> {
        return await this.companyRepository.find();
    }

    async create(companyDto: CompanyDto): Promise<Company> {
        const {userIds} = companyDto;

        const users = await this.getUsersByIds(userIds);

        return await this.companyRepository.createCompany(companyDto, users);
    }

    async delete(id: string): Promise<DeleteResult> {
        await this.userRepository.deleteCompanyRelations(id);
        const result = await this.companyRepository.delete({id: id})
        if(result.affected === 0) throw new HttpException({message: `Company with ID: ${id} not found`}, HttpStatus.BAD_REQUEST);
        return result;

    }

    private async getUsersByIds(ids: Array<string>) {
        const users: Array<User> = [];
        for(const id of ids) {
            try {
                const user = await this.userRepository.findUserById(id)
                users.push(user);
            } catch(error) { throw error; }
        }
        return users;
    }
}