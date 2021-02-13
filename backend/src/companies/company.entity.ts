import { User } from './../users/user.entity';
import { BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn, Entity } from 'typeorm';

@Entity('companies')
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(type => User, user => user.company, {eager: true})
    @JoinColumn()
    users: User[];

}