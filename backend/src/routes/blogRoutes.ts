import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostBySlug,
  updatePost,
  deletePost,
} from "../controllers/blogController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Blog routes
router.get("/", getPosts);
router.get("/:slug", getPostBySlug);

// Admin / Protected routes
router.post("/", protect, isAdmin, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
