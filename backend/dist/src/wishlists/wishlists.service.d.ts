import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
export declare class WishlistsService {
    private readonly wishesService;
    private wishelistsRepository;
    constructor(wishesService: WishesService, wishelistsRepository: Repository<Wishlist>);
    create(createWishlistsDto: CreateWishlistDto, owner: User): Promise<Wishlist>;
    findAll(): Promise<Wishlist[]>;
    findOne(id: number): Promise<Wishlist>;
    find(id: number): Promise<Wishlist | NotFoundException>;
    update(id: number, updateWishlistDto: UpdateWishlistDto, userId: number): Promise<Wishlist | NotFoundException | ForbiddenException>;
    remove(id: number, userId: number): Promise<NotFoundException>;
}
