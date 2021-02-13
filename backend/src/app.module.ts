import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './users/user.module';
import { CompanyModule } from './companies/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: ['src/**/*.entity.ts'],
      synchronize: true,
    }),
    UserModule,
    CompanyModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
}
