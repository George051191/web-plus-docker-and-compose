import { BadRequestException } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { UsersService } from 'src/users/users.service';
import { RequestWithUser } from 'src/utils/utilstypes';
export declare class WishlistsController {
    private readonly wishlistsService;
    private readonly usersService;
    constructor(wishlistsService: WishlistsService, usersService: UsersService);
    create(createWishlistDto: CreateWishlistDto, req: RequestWithUser): Promise<import("./entities/wishlist.entity").Wishlist>;
    findAll(): Promise<import("./entities/wishlist.entity").Wishlist[]>;
    findOne(id: string): Promise<import("./entities/wishlist.entity").Wishlist | import("@nestjs/common").NotFoundException> | BadRequestException;
    update(id: string, updateWishlistDto: UpdateWishlistDto, req: RequestWithUser): Promise<import("./entities/wishlist.entity").Wishlist | import("@nestjs/common").NotFoundException | import("@nestjs/common").ForbiddenException> | BadRequestException;
    remove(id: string, req: RequestWithUser): Promise<import("@nestjs/common").NotFoundException> | BadRequestException;
}
