import { User } from './../users/user.entity';
import { CompanyDto } from './dto/company.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Company } from './company.entity';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
    async createCompany(companyDto: CompanyDto, users: User[]): Promise<Company> {
        const {name, description} = companyDto;
        const company = new Company();
        company.name = name;
        company.description = description;
        company.users = users;

        await company.save();

        return company;
    }
}