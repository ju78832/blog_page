import { Request, Response, NextFunction } from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find().populate("author", "name");
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");

    if (!post) {
      res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Add user to req.body
    req.body.author = await User.findById(res.locals.jwtData.id);

    const post = await Post.create(req.body);

    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`,
      });
    }
    const user = await User.findById(res.locals.jwtData.id);

    // Make sure user is post owner or admin
    if (
      post.author.toString() !== res.locals.jwtData.id &&
      user.role !== "admin"
    ) {
      res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this post`,
      });
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request,

  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`,
      });
    }
    const user = await User.findById(res.locals.jwtData.id);

    // Make sure user is post owner or admin
    if (
      post.author.toString() !== res.locals.jwtData.id &&
      user.role !== "admin"
    ) {
      res.json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this post`,
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
