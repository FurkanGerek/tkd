import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/user";
import { Article } from '../entities/article';
import { Picture } from "../entities/picture";
import { Announcement } from "../entities/announcement";
dotenv.config();
const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // Geliştirme ortamı için otomatik tablo oluşturmayı sağlar
    logging: false, // Konsola sorguları yazdırmayı kapatır
    entities: [User, Article, Picture, Announcement], // Entity'leri buraya ekledim
});
export default AppDataSource;
