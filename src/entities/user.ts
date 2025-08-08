import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Article } from './article';
import { Picture } from "./picture";
import { Announcement } from "./announcement";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "blob" })
    picture!: Buffer;

    @Column()
    name!: string

    @Column()
    biography!: string

    @Column()
    email!: string

    @Column()
    contact_email!: string

    @Column()
    password!: string

    @Column({ default: false })
    isAdmin!: boolean

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Article, article => article.user)
    articles!: Article[];

    @OneToMany(() => Picture, picture => picture.user)
    pictures!: Picture[];

    @OneToMany(() => Announcement, announcement => announcement.user)
    announcements!: Announcement[];
}