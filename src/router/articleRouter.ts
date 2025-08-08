import { Router, Request, Response } from "express";
import AppDataSource from "../database/data-source.js";
import { Article } from "../entities/article.js";
import { User } from "../entities/user.js";

export const router = Router();

// Get articles by user id
router.get("/user/:userId", async (req: Request, res: Response) => {
    try {
        const articleRepo = AppDataSource.getRepository(Article);
        const userId = parseInt(req.params.userId);

        const articles = await articleRepo.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: {
                user: true
            },
            order: {
                createdAt: "DESC" // En yeni makaleler önce gelsin
            }
        });

        if (articles.length === 0) {
            return res.status(404).json({ success: false, message: "No articles found for this user" });
        }

        res.json({ success: true, data: articles });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch user's articles" });
    }
});

// Get all articles with user info
router.get("/", async (req: Request, res: Response) => {
    try {
        const articleRepo = AppDataSource.getRepository(Article);
        const articles = await articleRepo.find({
            relations: {
                user: true
            }
        });
        res.json({ success: true, data: articles });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch articles" });
    }
});

// Get article by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const articleRepo = AppDataSource.getRepository(Article);
        const articleId = parseInt(req.params.id);
        const article = await articleRepo.findOne({
            where: { id: articleId },
            relations: {
                user: true
            }
        });

        if (!article) {
            return res.status(404).json({ success: false, error: "Article not found" });
        }

        res.json({ success: true, data: article });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch article" });
    }
});

// Create new article
router.post("/", async (req: Request, res: Response) => {
    try {
        const articleRepo = AppDataSource.getRepository(Article);
        const userRepo = AppDataSource.getRepository(User);

        const { text, userId } = req.body;

        // Check if user exists
        const user = await userRepo.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Create new article
        const newArticle = articleRepo.create({
            text,
            user
        });

        await articleRepo.save(newArticle);

        // Return the article with user info
        const savedArticle = await articleRepo.findOne({
            where: { id: newArticle.id },
            relations: {
                user: true
            }
        });

        res.status(201).json({ success: true, data: savedArticle });
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).json({ success: false, error: "Failed to create article" });
    }
});

// Update article
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const articleRepo = AppDataSource.getRepository(Article);
        const articleId = parseInt(req.params.id);
        const { text } = req.body;

        const articleToUpdate = await articleRepo.findOne({
            where: { id: articleId },
            relations: {
                user: true
            }
        });

        if (!articleToUpdate) {
            return res.status(404).json({ success: false, error: "Article not found" });
        }

        // Update article text
        articleToUpdate.text = text;
        await articleRepo.save(articleToUpdate);

        res.json({ success: true, data: articleToUpdate });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to update article" });
    }
});

// Delete article
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const articleRepo = AppDataSource.getRepository(Article);
        const articleId = parseInt(req.params.id);

        const articleToDelete = await articleRepo.findOne({
            where: { id: articleId },
            relations: {
                user: true
            }
        });

        if (!articleToDelete) {
            return res.status(404).json({ success: false, error: "Article not found" });
        }

        await articleRepo.remove(articleToDelete);
        res.json({ success: true, message: "Article deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete article" });
    }
});