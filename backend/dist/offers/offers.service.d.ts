import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
export declare class OffersService {
    create(createOfferDto: CreateOfferDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOfferDto: UpdateOfferDto): string;
    remove(id: number): string;
}
