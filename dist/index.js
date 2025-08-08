"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const data_source_1 = __importDefault(require("~/database/data-source"));
const app = (0, express_1.default)();
const port = 3000;
(async () => {
    try {
        await data_source_1.default.initialize();
        console.log("✅ Veritabanı bağlantısı başarılı!");
        // Diğer uygulama başlangıç kodların buraya gelecek
    }
    catch (error) {
        console.error("❌ Veritabanı başlatılırken hata oluştu:", error);
    }
})();
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({
    limit: "50mb",
    extended: true,
}));
app.listen(port, () => {
    console.log(`Uygulama http://localhost:${port} üzerinde çalışıyor.`);
});
