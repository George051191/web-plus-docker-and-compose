import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
export declare class WishesService {
    create(createWishDto: CreateWishDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateWishDto: UpdateWishDto): string;
    remove(id: number): string;
}
