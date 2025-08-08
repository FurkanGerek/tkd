import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.js"

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User, (user: User) => user.articles)
    user!: User;

    @Column("text")
    text!: string

    @Column("boolean", { default: false })
    isConfirmed!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}