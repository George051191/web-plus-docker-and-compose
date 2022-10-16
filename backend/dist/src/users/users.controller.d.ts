import { NotFoundException, HttpException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestWithUser } from 'src/utils/utilstypes';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findUser(req: RequestWithUser): Promise<import("./entities/user.entity").User>;
    findMany(body: {
        query: string;
    }): Promise<import("./entities/user.entity").User | HttpException>;
    findCurrentUserWishes(req: any): Promise<import("../wishes/entities/wish.entity").Wish[] | NotFoundException>;
    findUserWishes(req: any, username: string): Promise<import("../wishes/entities/wish.entity").Wish[] | NotFoundException>;
    findCurrentUser(username: string): Promise<import("./entities/user.entity").User | NotFoundException>;
    findOne(id: string): Promise<import("./entities/user.entity").User | NotFoundException | BadRequestException>;
    update(req: RequestWithUser, updateUserDto: UpdateUserDto): HttpException | Promise<import("./entities/user.entity").User | BadRequestException>;
}
