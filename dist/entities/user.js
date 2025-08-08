var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Article } from './article.js';
import { Picture } from "./picture.js";
import { Announcement } from "./announcement.js";
let User = class User {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column({ type: "blob", select: false }),
    __metadata("design:type", Buffer)
], User.prototype, "picture", void 0);
__decorate([
    Column("varchar"),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], User.prototype, "biography", void 0);
__decorate([
    Column("varchar", { select: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column("varchar"),
    __metadata("design:type", String)
], User.prototype, "contact_email", void 0);
__decorate([
    Column("varchar", { select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column("boolean", { default: false, select: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => Article, (article) => article.user),
    __metadata("design:type", Array)
], User.prototype, "articles", void 0);
__decorate([
    OneToMany(() => Picture, (picture) => picture.user),
    __metadata("design:type", Array)
], User.prototype, "pictures", void 0);
__decorate([
    OneToMany(() => Announcement, (announcement) => announcement.user),
    __metadata("design:type", Array)
], User.prototype, "announcements", void 0);
User = __decorate([
    Entity()
], User);
export { User };
