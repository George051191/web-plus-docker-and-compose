import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';
export declare class Wish {
    id: number;
    createdAt: Date;
    updateAt: Date;
    name: string;
    link: string;
    image: string;
    price: number;
    raised: number;
    owner: User;
    description: string;
    offers: Offer[];
    copied: number;
}
