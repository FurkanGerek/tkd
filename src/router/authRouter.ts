import { Router, Request, Response } from "express";
import AppDataSource from "../database/data-source.js";

// User entity import
import { User } from "../entities/user.js";
export const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    console.log("POST /api/user/register endpoint called");

    const userRepo = AppDataSource.getRepository(User);

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    try {
        const newUser = userRepo.create({ name, email });
        const savedUser = await userRepo.save(newUser);

        return res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/", async ({ req, res }: { req: Request, res: Response }) => {

});

router.put("/", async ({ req, res }: { req: Request, res: Response }) => {

});

router.delete("/", async ({ req, res }: { req: Request, res: Response }) => {

});
