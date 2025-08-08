import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"

import { User } from "./user"

@Entity()
export class Announcement {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User, (user) => user.articles)
    user!: User;

    @Column()
    text!: string

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}