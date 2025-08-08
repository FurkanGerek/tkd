import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Article } from './article.js';
import { Picture } from "./picture.js";
import { Announcement } from "./announcement.js";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "blob", select: false })
    picture!: Buffer;

    @Column("varchar")
    name!: string

    @Column("text")
    biography!: string

    @Column("varchar", { select: false })
    email!: string

    @Column("varchar")
    contact_email!: string

    @Column("varchar", { select: false })
    password!: string

    @Column("boolean", { default: false, select: false })
    isAdmin!: boolean

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Article, (article: Article) => article.user)
    articles!: Article[];

    @OneToMany(() => Picture, (picture: Picture) => picture.user)
    pictures!: Picture[];

    @OneToMany(() => Announcement, (announcement: Announcement) => announcement.user)
    announcements!: Announcement[];
}