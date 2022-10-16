import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Offer {
    id: number;
    createdAt: Date;
    updateAt: Date;
    user: User;
    item: Wish;
    amount: number;
    hidden: boolean;
}
