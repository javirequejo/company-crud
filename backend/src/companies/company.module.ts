import { UserRepository } from './../users/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository]),
            TypeOrmModule.forFeature([UserRepository])],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService]
})

export class CompanyModule{}
