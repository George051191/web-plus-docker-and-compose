import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    create(createOfferDto: CreateOfferDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOfferDto: UpdateOfferDto): string;
    remove(id: string): string;
}
