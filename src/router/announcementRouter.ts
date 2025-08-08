import { Router, Request, Response } from "express";
import AppDataSource from "../database/data-source.js";
import { Announcement } from "../entities/announcement.js";
import { User } from "../entities/user.js";

export const router = Router();

// Get all announcements with user info
router.get("/", async (req: Request, res: Response) => {
    try {
        const announcementRepo = AppDataSource.getRepository(Announcement);
        const announcements = await announcementRepo.find({
            relations: {
                user: true
            },
            order: {
                createdAt: "DESC" // En yeni duyurular önce
            }
        });
        res.json({ success: true, data: announcements });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch announcements" });
    }
});

// Get announcement by id
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const announcementRepo = AppDataSource.getRepository(Announcement);
        const announcementId = parseInt(req.params.id);
        const announcement = await announcementRepo.findOne({
            where: { id: announcementId },
            relations: {
                user: true
            }
        });

        if (!announcement) {
            return res.status(404).json({ success: false, error: "Announcement not found" });
        }

        res.json({ success: true, data: announcement });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch announcement" });
    }
});

// Create new announcement
router.post("/", async (req: Request, res: Response) => {
    try {
        const announcementRepo = AppDataSource.getRepository(Announcement);
        const userRepo = AppDataSource.getRepository(User);

        const { text, userId } = req.body;

        // Check if user exists
        const user = await userRepo.findOneBy({ id: userId });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Check if user is admin
        if (!user.isAdmin) {
            return res.status(403).json({ success: false, error: "Only admins can create announcements" });
        }

        // Create new announcement
        const newAnnouncement = announcementRepo.create({
            text,
            user
        });

        await announcementRepo.save(newAnnouncement);

        // Return the announcement with user info
        const savedAnnouncement = await announcementRepo.findOne({
            where: { id: newAnnouncement.id },
            relations: {
                user: true
            }
        });

        res.status(201).json({ success: true, data: savedAnnouncement });
    } catch (error) {
        console.error("Error creating announcement:", error);
        res.status(500).json({ success: false, error: "Failed to create announcement" });
    }
});

// Update announcement
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const announcementRepo = AppDataSource.getRepository(Announcement);
        const announcementId = parseInt(req.params.id);
        const { text, userId } = req.body;

        const announcementToUpdate = await announcementRepo.findOne({
            where: { id: announcementId },
            relations: {
                user: true
            }
        });

        if (!announcementToUpdate) {
            return res.status(404).json({ success: false, error: "Announcement not found" });
        }

        // Check if the user updating is the creator or an admin
        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOneBy({ id: userId });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        if (!user.isAdmin && announcementToUpdate.user.id !== userId) {
            return res.status(403).json({ success: false, error: "Only admins or the creator can update this announcement" });
        }

        // Update announcement text
        announcementToUpdate.text = text;
        await announcementRepo.save(announcementToUpdate);

        res.json({ success: true, data: announcementToUpdate });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to update announcement" });
    }
});

// Delete announcement
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const announcementRepo = AppDataSource.getRepository(Announcement);
        const userRepo = AppDataSource.getRepository(User);
        const announcementId = parseInt(req.params.id);
        const userId = parseInt(req.body.userId); // Delete işlemi için user ID'si gerekli

        const announcementToDelete = await announcementRepo.findOne({
            where: { id: announcementId },
            relations: {
                user: true
            }
        });

        if (!announcementToDelete) {
            return res.status(404).json({ success: false, error: "Announcement not found" });
        }

        // Check if the user deleting is the creator or an admin
        const user = await userRepo.findOneBy({ id: userId });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        if (!user.isAdmin && announcementToDelete.user.id !== userId) {
            return res.status(403).json({ success: false, error: "Only admins or the creator can delete this announcement" });
        }

        await announcementRepo.remove(announcementToDelete);
        res.json({ success: true, message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to delete announcement" });
    }
});


