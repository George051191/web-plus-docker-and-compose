"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const wishes_service_1 = require("../wishes/wishes.service");
const typeorm_2 = require("typeorm");
const wishlist_entity_1 = require("./entities/wishlist.entity");
let WishlistsService = class WishlistsService {
    constructor(wishesService, wishelistsRepository) {
        this.wishesService = wishesService;
        this.wishelistsRepository = wishelistsRepository;
    }
    async create(createWishlistsDto, owner) {
        const wishes = await this.wishesService.find({
            where: { id: (0, typeorm_2.In)(createWishlistsDto.itemsId || []) },
        });
        const wishList = await this.wishelistsRepository.create(Object.assign(Object.assign({}, createWishlistsDto), { owner: owner, items: wishes }));
        return this.wishelistsRepository.save(wishList);
    }
    findAll() {
        return this.wishelistsRepository.find({
            relations: {
                owner: true,
            },
        });
    }
    findOne(id) {
        return this.wishelistsRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                owner: {
                    offers: true,
                    wishes: true,
                    wishlists: true,
                },
            },
        });
    }
    async find(id) {
        const wishlists = await this.wishelistsRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                owner: {
                    offers: true,
                    wishes: true,
                    wishlists: true,
                },
            },
        });
        if (!wishlists) {
            return new common_1.NotFoundException();
        }
        return wishlists;
    }
    async update(id, updateWishlistDto, userId) {
        const wishList = await this.findOne(id);
        if (!wishList) {
            return new common_1.NotFoundException();
        }
        if (userId !== wishList.owner.id) {
            return new common_1.ForbiddenException();
        }
        await this.wishelistsRepository.update(id, updateWishlistDto);
        return this.findOne(id);
    }
    async remove(id, userId) {
        const wishList = await this.findOne(id);
        if (!wishList) {
            return new common_1.NotFoundException();
        }
        if (userId !== wishList.owner.id) {
            throw new common_1.ForbiddenException();
        }
        await this.wishelistsRepository.delete(id);
    }
};
WishlistsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __metadata("design:paramtypes", [wishes_service_1.WishesService,
        typeorm_2.Repository])
], WishlistsService);
exports.WishlistsService = WishlistsService;
//# sourceMappingURL=wishlists.service.js.map