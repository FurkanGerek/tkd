import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { Article } from '../entities/article';
import { Picture } from "../entities/picture";
import { Announcement } from "../entities/announcement";
import { User } from "../entities/user"

dotenv.config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: "cu",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
})


export default AppDataSource
