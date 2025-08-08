var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user";
let Picture = class Picture {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Picture.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.pictures) // "user.articles" -> "user.pictures" olarak düzeltildi
    ,
    __metadata("design:type", User)
], Picture.prototype, "user", void 0);
__decorate([
    Column({ type: "blob" }),
    __metadata("design:type", Buffer)
], Picture.prototype, "picture", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Picture.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Picture.prototype, "updatedAt", void 0);
Picture = __decorate([
    Entity()
], Picture);
export { Picture };
