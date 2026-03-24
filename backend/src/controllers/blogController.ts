import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import logger from "../utils/logger.js";
import { PostStatus } from "@prisma/client";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import slugify from "slugify";

// Create a new blog post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, category, status, coverImage } = req.body;
    const authorId = (req as any).user.id;

    const slug =
      slugify(title, { lower: true, strict: true }) + "-" + Date.now();

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        status: status || PostStatus.DRAFT,
        coverImage,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res
      .status(201)
      .json(successResponse(post, "Blog post created successfully"));
  } catch (error) {
    logger.error({ err: error, title: req.body.title }, "Create post failed");
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Get all blog posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(successResponse(posts, "Blog posts retrieved successfully"));
  } catch (error) {
    logger.error({ err: error }, "Get posts failed");
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Get a single blog post by slug
export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: { slug: slug as string },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json(errorResponse("Post not found", 404));
    }

    // Increment views
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    res.json(successResponse(post, "Blog post retrieved successfully"));
  } catch (error) {
    logger.error({ err: error, slug: req.params.slug }, "Get post failed");
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Update a blog post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json(errorResponse("ID is required", 400));

    const { title, content, excerpt, category, status, coverImage } = req.body;
    const userId = (req as any).user.id;

    const existingPost = await prisma.blogPost.findUnique({
      where: { id: parseInt(id as string) },
    });

    if (!existingPost) {
      return res.status(404).json(errorResponse("Post not found", 404));
    }

    // Check if user is author or admin
    if (
      existingPost.authorId !== userId &&
      (req as any).user.role !== "ADMIN"
    ) {
      return res.status(403).json(errorResponse("Unauthorized", 403));
    }

    const updatedData: any = {
      title,
      content,
      excerpt,
      category,
      status,
      coverImage,
    };

    if (title && title !== existingPost.title) {
      updatedData.slug =
        slugify(title, { lower: true, strict: true }) + "-" + Date.now();
    }

    const post = await prisma.blogPost.update({
      where: { id: parseInt(id as string) },
      data: updatedData,
    });

    res.json(successResponse(post, "Blog post updated successfully"));
  } catch (error) {
    logger.error({ err: error, id: req.params.id }, "Update post failed");
    res.status(500).json(errorResponse("Server error", 500));
  }
};

// Delete a blog post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json(errorResponse("ID is required", 400));
    const userId = (req as any).user.id;

    const existingPost = await prisma.blogPost.findUnique({
      where: { id: parseInt(id as string) },
    });

    if (!existingPost) {
      return res.status(404).json(errorResponse("Post not found", 404));
    }

    // Check if user is author or admin
    if (
      existingPost.authorId !== userId &&
      (req as any).user.role !== "ADMIN"
    ) {
      return res.status(403).json(errorResponse("Unauthorized", 403));
    }

    await prisma.blogPost.delete({
      where: { id: parseInt(id as string) },
    });

    res.json(successResponse(null, "Blog post deleted successfully"));
  } catch (error) {
    logger.error({ err: error, id: req.params.id }, "Delete post failed");
    res.status(500).json(errorResponse("Server error", 500));
  }
};
