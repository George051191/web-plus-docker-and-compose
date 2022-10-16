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
exports.WishesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wish_entity_1 = require("./entities/wish.entity");
const user_entity_1 = require("../users/entities/user.entity");
let WishesService = class WishesService {
    constructor(wishesRepository) {
        this.wishesRepository = wishesRepository;
    }
    create(createWishDto, owner) {
        return this.wishesRepository.save(Object.assign(Object.assign({}, createWishDto), { owner: owner, copied: 0, raised: 0 }));
    }
    async find(options) {
        return this.wishesRepository.find(options);
    }
    findAll(options) {
        return this.wishesRepository.find({
            where: {
                id: (0, typeorm_2.In)(options),
            },
        });
    }
    findLast() {
        return this.wishesRepository.find({
            relations: {
                owner: {
                    offers: true,
                    wishes: true,
                    wishlists: true,
                },
            },
            order: {
                createdAt: 'DESC',
            },
            take: 40,
        });
    }
    findTops() {
        return this.wishesRepository.find({
            order: {
                copied: 'DESC',
            },
            relations: {
                owner: {
                    offers: true,
                    wishes: true,
                    wishlists: true,
                },
            },
            take: 20,
        });
    }
    findOne(id) {
        return this.wishesRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                offers: {
                    user: {
                        wishes: true,
                        wishlists: true,
                        offers: true,
                    },
                },
                owner: true,
            },
        });
    }
    async update(id, updateWishDto, owner, copied, raised) {
        await this.wishesRepository.update(id, Object.assign(Object.assign({}, updateWishDto), { owner: owner, copied: copied, raised: raised }));
        return this.findOne(id);
    }
    async updateRised(id, updateWishDto, raised) {
        await this.wishesRepository.update(id, Object.assign(Object.assign({}, updateWishDto), { raised: raised }));
        return this.findOne(id);
    }
    async updateWithChecks(id, updateWishDto, req) {
        const wish = await this.findOne(+id);
        if (wish.owner.id !== req.user.id) {
            throw new common_1.ForbiddenException();
        }
        if (wish.offers.length > 0) {
            const price = wish.price;
            return this.update(+id, Object.assign(Object.assign({}, updateWishDto), { price: price }));
        }
        return this.update(+id, updateWishDto);
    }
    async remove(id) {
        await this.wishesRepository.delete(id);
    }
    async removeWithChecks(id, req) {
        const wish = await this.findOne(+id);
        if (!wish) {
            throw new common_1.NotFoundException();
        }
        if (wish.owner.id !== req.user.id) {
            throw new common_1.ForbiddenException();
        }
        await this.remove(id);
        return wish;
    }
};
WishesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wish_entity_1.Wish)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WishesService);
exports.WishesService = WishesService;
//# sourceMappingURL=wishes.service.js.map