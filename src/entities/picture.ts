import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user.js"

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User, (user: User) => user.pictures) // "user.articles" -> "user.pictures" olarak düzeltildi
    user!: User;

    @Column({ type: "blob" })
    picture!: Buffer;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}