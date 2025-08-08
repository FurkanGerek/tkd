import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.js"

@Entity()
export class Announcement {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User, (user: User) => user.announcements) // "user.articles" -> "user.announcements" olarak düzeltildi
    user!: User;

    @Column("text")
    text!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}