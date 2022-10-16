import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
export declare class WishesController {
    private readonly wishesService;
    constructor(wishesService: WishesService);
    create(createWishDto: CreateWishDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateWishDto: UpdateWishDto): string;
    remove(id: string): string;
}
