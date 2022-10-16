import { EmailSender } from 'src/emailsender/emailsender.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
export declare class OffersService {
    private readonly userservice;
    private readonly wishesService;
    private readonly emailservice;
    offersRepository: Repository<Offer>;
    constructor(userservice: UsersService, wishesService: WishesService, emailservice: EmailSender, offersRepository: Repository<Offer>);
    create(createOfferDto: CreateOfferDto, user: User): Promise<{
        user: User;
        item: import("../wishes/entities/wish.entity").Wish;
        amount: number;
        hidden: boolean;
        itemId: number;
    } & Offer>;
    findAll(): Promise<Offer[]>;
    findOne(id: number): Promise<Offer>;
    remove(id: number): Promise<void>;
}
