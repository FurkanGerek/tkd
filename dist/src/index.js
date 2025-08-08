import express from "express";
import AppDataSource from "./database/data-source";
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
    }
    catch (err) {
        console.error("❌ Test sorgusu hatası:", err);
    }
    finally {
        await queryRunner.release();
    }
})
    .catch((err) => {
    console.error("❌ Veritabanı bağlantı hatası:", err);
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({
    limit: "50mb",
    extended: true,
}));
app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} üzerinde çalışıyor.`);
});
