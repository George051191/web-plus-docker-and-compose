import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';
export declare class WishesService {
    private wishesRepository;
    constructor(wishesRepository: Repository<Wish>);
    create(createWishDto: CreateWishDto, owner: User): Promise<{
        owner: User;
        copied: number;
        raised: number;
        name: string;
        link: string;
        image: string;
        price: number;
        description: string;
    } & Wish>;
    find(options: any): Promise<Wish[]>;
    findAll(options?: any): Promise<Wish[]>;
    findLast(): Promise<Wish[]>;
    findTops(): Promise<Wish[]>;
    findOne(id: number): Promise<Wish>;
    update(id: number, updateWishDto?: UpdateWishDto, owner?: User, copied?: number, raised?: number): Promise<Wish>;
    updateRised(id: number, updateWishDto: UpdateWishDto, raised: number): Promise<Wish>;
    updateWithChecks(id: number, updateWishDto: UpdateWishDto, req: any): Promise<Wish>;
    remove(id: number): Promise<void>;
    removeWithChecks(id: number, req: any): Promise<Wish>;
}
