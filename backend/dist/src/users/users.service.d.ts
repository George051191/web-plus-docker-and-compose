import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findUserWishes(name: string): Promise<import("../wishes/entities/wish.entity").Wish[] | NotFoundException>;
    findOne(id: number): Promise<User>;
    find(options: any, conditions?: any): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User | BadRequestException>;
    remove(id: number): Promise<void>;
}
