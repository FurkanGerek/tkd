import { Router } from "express";
import AppDataSource from "../database/data-source.js";
// User entity import
import { User } from "../entities/user.js";
export const router = Router();
router.get("/", async (req, res) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const users = await userRepo.find();
        res.json({ success: true, data: users });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch users" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const userId = parseInt(req.params.id);
        const user = await userRepo.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        res.json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch user" });
    }
});
router.post("/", async (req, res) => {
    try {
        console.log("POST /api/user/register endpoint called");
        const userRepo = AppDataSource.getRepository(User);
        const { name, email, biography, contact_email, password } = req.body;
        // Create new user with all required fields
        const newUser = userRepo.create({
            name,
            email,
            biography,
            contact_email,
            password,
            isAdmin: false // default value
        });
        await userRepo.save(newUser);
        res.status(201).json({ success: true, data: newUser });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, error: "Failed to create user" });
    }
});
router.put("/:id", async (req, res) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const userId = parseInt(req.params.id);
        const userToUpdate = await userRepo.findOneBy({ id: userId });
        if (!userToUpdate) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        // Update user fields
        Object.assign(userToUpdate, req.body);
        await userRepo.save(userToUpdate);
        res.json({ success: true, data: userToUpdate });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to update user" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const userId = parseInt(req.params.id);
        const userToDelete = await userRepo.findOneBy({ id: userId });
        if (!userToDelete) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        await userRepo.remove(userToDelete);
        res.json({ success: true, message: "User deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete user" });
    }
});
