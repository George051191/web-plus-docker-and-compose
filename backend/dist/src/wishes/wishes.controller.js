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
exports.WishesController = void 0;
const common_1 = require("@nestjs/common");
const wishes_service_1 = require("./wishes.service");
const create_wish_dto_1 = require("./dto/create-wish.dto");
const update_wish_dto_1 = require("./dto/update-wish.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const users_service_1 = require("../users/users.service");
const utilstypes_1 = require("../utils/utilstypes");
let WishesController = class WishesController {
    constructor(wishesService, usersService) {
        this.wishesService = wishesService;
        this.usersService = usersService;
    }
    async create(createWishDto, req) {
        const owner = await this.usersService.findOne(req.user.id);
        return this.wishesService.create(createWishDto, owner);
    }
    getlast() {
        return this.wishesService.findLast();
    }
    getTop() {
        return this.wishesService.findTops();
    }
    async copyWish(id, req) {
        if (isNaN(+id)) {
            return new common_1.BadRequestException();
        }
        const wish = await this.wishesService.findOne(+id);
        if (!wish) {
            throw new common_1.NotFoundException();
        }
        const { name, description, price, link, image, owner: currentOwner, copied, } = wish;
        const owner = await this.usersService.findOne(req.user.id);
        this.wishesService.update(+id, { name, description, price, link, image }, currentOwner, copied + 1);
        return this.wishesService.create({ name, description, price, link, image }, owner);
    }
    async update(id, updateWishDto, req) {
        if (isNaN(+id)) {
            return new common_1.BadRequestException();
        }
        return this.wishesService.updateWithChecks(+id, updateWishDto, req);
    }
    async remove(id, req) {
        const wish = await this.wishesService.removeWithChecks(+id, req);
        if (!wish) {
            throw new common_1.NotFoundException();
        }
        return wish;
    }
    async findOne(id) {
        if (isNaN(+id)) {
            return new common_1.BadRequestException();
        }
        const wish = await this.wishesService.findOne(+id);
        if (!wish) {
            throw new common_1.NotFoundException();
        }
        return wish;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wish_dto_1.CreateWishDto, Object]),
    __metadata("design:returntype", Promise)
], WishesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('last'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "getlast", null);
__decorate([
    (0, common_1.Get)('top'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WishesController.prototype, "getTop", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(':id/copy'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WishesController.prototype, "copyWish", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_wish_dto_1.UpdateWishDto, Object]),
    __metadata("design:returntype", Promise)
], WishesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WishesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WishesController.prototype, "findOne", null);
WishesController = __decorate([
    (0, common_1.Controller)('wishes'),
    __metadata("design:paramtypes", [wishes_service_1.WishesService,
        users_service_1.UsersService])
], WishesController);
exports.WishesController = WishesController;
//# sourceMappingURL=wishes.controller.js.map