import { Company } from './../companies/company.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Company, company => company.users, { nullable: true})
  company: Company;

}