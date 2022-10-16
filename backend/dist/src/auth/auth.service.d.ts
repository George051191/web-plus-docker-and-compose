import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    auth(user: User): {
        access_token: string;
    };
    validatePassword(username: string, password: string): Promise<User>;
}
