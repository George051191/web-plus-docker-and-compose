import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistsController {
    private readonly wishlistsService;
    constructor(wishlistsService: WishlistsService);
    create(createWishlistDto: CreateWishlistDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateWishlistDto: UpdateWishlistDto): string;
    remove(id: string): string;
}
