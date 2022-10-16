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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const bcrypt = require("bcryptjs");
const jwt_guard_1 = require("../guards/jwt.guard");
const utilstypes_1 = require("../utils/utilstypes");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        const { password } = createUserDto, res = __rest(createUserDto, ["password"]);
        return bcrypt
            .hash(password, 10)
            .then((hash) => this.usersService.create(Object.assign({ password: hash }, res)));
    }
    findAll() {
        return this.usersService.findAll();
    }
    findUser(req) {
        console.log(req.user);
        return this.usersService.find({ username: req.user.username });
    }
    async findMany(body) {
        if (Object.keys(body).length === 0) {
            return new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Укажите почту для поиска юзера',
            }, common_1.HttpStatus.CONFLICT);
        }
        const user = await this.usersService.find({ email: body.query });
        if (!user) {
            return new common_1.NotFoundException();
        }
        return user;
    }
    findCurrentUserWishes(req) {
        return this.usersService.findUserWishes(req.user.username);
    }
    async findUserWishes(req, username) {
        const wishes = await this.usersService.findUserWishes(username);
        if (!wishes) {
            return new common_1.NotFoundException();
        }
        return wishes;
    }
    async findCurrentUser(username) {
        const user = await this.usersService.find({ username: username });
        if (!user) {
            return new common_1.NotFoundException();
        }
        return user;
    }
    async findOne(id) {
        if (isNaN(+id)) {
            return new common_1.BadRequestException();
        }
        const user = await this.usersService.findOne(+id);
        if (!user) {
            return new common_1.NotFoundException();
        }
        return user;
    }
    update(req, updateUserDto) {
        if (Object.keys(updateUserDto).length === 0) {
            return new common_1.HttpException({
                status: common_1.HttpStatus.CONFLICT,
                error: 'Укажите какие данные нужно поменять',
            }, common_1.HttpStatus.CONFLICT);
        }
        const { password } = updateUserDto, res = __rest(updateUserDto, ["password"]);
        if (password !== undefined) {
            return bcrypt
                .hash(password, 10)
                .then((hash) => this.usersService.update(req.user.id, Object.assign({ password: hash }, res)));
        }
        return this.usersService.update(req.user.id, updateUserDto);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('find'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findMany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)('me/wishes'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findCurrentUserWishes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':username/wishes'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUserWishes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':username'),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findCurrentUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map