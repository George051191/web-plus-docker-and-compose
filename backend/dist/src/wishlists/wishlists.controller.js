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
exports.WishlistsController = void 0;
const common_1 = require("@nestjs/common");
const wishlists_service_1 = require("./wishlists.service");
const create_wishlist_dto_1 = require("./dto/create-wishlist.dto");
const update_wishlist_dto_1 = require("./dto/update-wishlist.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
const users_service_1 = require("../users/users.service");
const utilstypes_1 = require("../utils/utilstypes");
let WishlistsController = class WishlistsController {
    constructor(wishlistsService, usersService) {
        this.wishlistsService = wishlistsService;
        this.usersService = usersService;
    }
    async create(createWishlistDto, req) {
        const owner = await this.usersService.findOne(req.user.id);
        return this.wishlistsService.create(createWishlistDto, owner);
    }
    findAll() {
        return this.wishlistsService.findAll();
    }
    findOne(id) {
        if (isNaN(+id)) {
            return new common_1.BadRequestException();
        }
        return this.wishlistsService.find(+id);
    }
    update(id, updateWishlistDto, req) {
        if (isNaN(+id)) {
            return new common_1.BadRequestException();
        }
        return this.wishlistsService.update(+id, updateWishlistDto, req.user.id);
    }
    remove(id, req) {
        if (isNaN(+id)) {
            return new common_1.BadRequestException();
        }
        return this.wishlistsService.remove(+id, req.user.id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wishlist_dto_1.CreateWishlistDto, Object]),
    __metadata("design:returntype", Promise)
], WishlistsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_wishlist_dto_1.UpdateWishlistDto, Object]),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WishlistsController.prototype, "remove", null);
WishlistsController = __decorate([
    (0, common_1.Controller)('wishlists'),
    __metadata("design:paramtypes", [wishlists_service_1.WishlistsService,
        users_service_1.UsersService])
], WishlistsController);
exports.WishlistsController = WishlistsController;
//# sourceMappingURL=wishlists.controller.js.map