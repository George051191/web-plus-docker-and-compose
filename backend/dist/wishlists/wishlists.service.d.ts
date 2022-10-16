import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
export declare class WishlistsService {
    create(createWishlistDto: CreateWishlistDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateWishlistDto: UpdateWishlistDto): string;
    remove(id: number): string;
}
