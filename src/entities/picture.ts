import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./user"

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => User, (user) => user.articles)
    user!: User;

    @Column({ type: "blob" })
    picture!: Buffer;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}