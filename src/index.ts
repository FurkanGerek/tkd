import "reflect-metadata";
import express from "express";
import AppDataSource from "./database/data-source.js";

import { router as articleRouter } from "./router/articleRouter.js";
import { router as userRouter } from "./router/userRouter.js";
import { router as authRouter } from "./router/authRouter.js";
import { router as announcementRouter } from "./router/announcementRouter.js";

const app = express();
const port = 3000;

AppDataSource.initialize()
    .then(async () => {
        console.log("✅ Veritabanı bağlantısı başarılı!");

        // Test sorgusu (isteğe bağlı)
        const queryRunner = AppDataSource.createQueryRunner();
        try {
            const result = await queryRunner.query("SELECT 1");
            console.log("📡 Test sorgusu sonucu:", result);
        } catch (err) {
            console.error("❌ Test sorgusu hatası:", err);
        } finally {
            await queryRunner.release();
        }
    })
    .catch((err) => {
        console.error("❌ Veritabanı bağlantı hatası:", err);
    });

app.use(express.json());
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
    })
);

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/article/", articleRouter);
app.use("/api/announcement/", announcementRouter);

app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} üzerinde çalışıyor.`);
});