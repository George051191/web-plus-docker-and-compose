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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const emailsender_service_1 = require("../emailsender/emailsender.service");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const wishes_service_1 = require("../wishes/wishes.service");
const typeorm_2 = require("typeorm");
const offer_entity_1 = require("./entities/offer.entity");
let OffersService = class OffersService {
    constructor(userservice, wishesService, emailservice, offersRepository) {
        this.userservice = userservice;
        this.wishesService = wishesService;
        this.emailservice = emailservice;
        this.offersRepository = offersRepository;
    }
    async create(createOfferDto, user) {
        const { itemId, amount } = createOfferDto;
        const wish = await this.wishesService.findOne(+itemId);
        if (!wish) {
            throw new common_1.NotFoundException();
        }
        if (wish.price === wish.raised) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Средства на подарок уже собраны',
            }, common_1.HttpStatus.CONFLICT);
        }
        const { name, description, image, price, raised } = wish;
        if (wish.owner.id === user.id) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Запрещено отправлять деньги на собственные подарки',
            }, common_1.HttpStatus.CONFLICT);
        }
        if (wish.price < amount + wish.raised) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: `Внесите не больше этой суммы: ${wish.price - wish.raised} `,
            }, common_1.HttpStatus.CONFLICT);
        }
        const updatedWish = await this.wishesService.updateRised(itemId, {
            name,
            description,
            image,
            price,
        }, raised + amount);
        if (updatedWish.raised === updatedWish.price) {
            const usersMails = updatedWish.offers.map((item) => {
                return item.user.email;
            });
            await this.emailservice.sendEmail(usersMails, updatedWish.link, updatedWish.image);
            return;
        }
        return this.offersRepository.save(Object.assign(Object.assign({}, createOfferDto), { user: user, item: updatedWish }));
    }
    findAll() {
        return this.offersRepository.find({
            relations: {
                item: {
                    owner: {
                        wishes: true,
                        wishlists: true,
                    },
                },
                user: {
                    offers: true,
                    wishes: true,
                    wishlists: true,
                },
            },
        });
    }
    async findOne(id) {
        const offer = await this.offersRepository.findOneBy({ id });
        if (!offer) {
            throw new common_1.NotFoundException();
        }
        return offer;
    }
    async remove(id) {
        await this.offersRepository.delete(id);
    }
};
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        wishes_service_1.WishesService,
        emailsender_service_1.EmailSender,
        typeorm_2.Repository])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map