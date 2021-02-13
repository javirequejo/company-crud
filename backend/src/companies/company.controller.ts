import { Company } from './company.entity';
import { Body, Controller, Get, Post, Delete, Param, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  async findAll(): Promise<Company[]> {
    return await this.companyService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, description: 'The company has been successfully created.'})
  async create(@Body() companyDto: CompanyDto) {
    return await this.companyService.create(companyDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The company has been successfully deleted.'})
  async delete(@Param() params) {
    await this.companyService.delete(params.id);
    return {status: 200, message: 'The company has been successfully deleted.'}
  }
}