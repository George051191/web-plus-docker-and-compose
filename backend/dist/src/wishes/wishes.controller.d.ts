import { BadRequestException } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from 'src/utils/utilstypes';
export declare class WishesController {
    private readonly wishesService;
    private readonly usersService;
    constructor(wishesService: WishesService, usersService: UsersService);
    create(createWishDto: CreateWishDto, req: RequestWithUser): Promise<{
        owner: import("../users/entities/user.entity").User;
        copied: number;
        raised: number;
        name: string;
        link: string;
        image: string;
        price: number;
        description: string;
    } & import("./entities/wish.entity").Wish>;
    getlast(): Promise<import("./entities/wish.entity").Wish[]>;
    getTop(): Promise<import("./entities/wish.entity").Wish[]>;
    copyWish(id: string, req: RequestWithUser): Promise<BadRequestException | ({
        owner: import("../users/entities/user.entity").User;
        copied: number;
        raised: number;
        name: string;
        link: string;
        image: string;
        price: number;
        description: string;
    } & import("./entities/wish.entity").Wish)>;
    update(id: string, updateWishDto: UpdateWishDto, req: RequestWithUser): Promise<import("./entities/wish.entity").Wish | BadRequestException>;
    remove(id: string, req: RequestWithUser): Promise<import("./entities/wish.entity").Wish>;
    findOne(id: string): Promise<import("./entities/wish.entity").Wish | BadRequestException>;
}
