"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const wishes_module_1 = require("./wishes/wishes.module");
const wishlists_module_1 = require("./wishlists/wishlists.module");
const offers_module_1 = require("./offers/offers.module");
const user_entity_1 = require("./users/entities/user.entity");
const wish_entity_1 = require("./wishes/entities/wish.entity");
const offer_entity_1 = require("./offers/entities/offer.entity");
const wishlist_entity_1 = require("./wishlists/entities/wishlist.entity");
const auth_module_1 = require("./auth/auth.module");
const app_service_1 = require("./app.service");
const emailsender_module_1 = require("./emailsender/emailsender.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            wishlists_module_1.WishlistsModule,
            wishes_module_1.WishesModule,
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'student',
                password: 'student',
                database: 'kupipodariday',
                entities: [user_entity_1.User, wish_entity_1.Wish, offer_entity_1.Offer, wishlist_entity_1.Wishlist],
                synchronize: true,
            }),
            offers_module_1.OffersModule,
            auth_module_1.AuthModule,
            emailsender_module_1.EmailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map