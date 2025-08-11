import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../config/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, isPublish, category } = req.body;
    const blogImage = req.file?.path;
    if (!title || !blogImage || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    const blog = new Blog({
      blogImage,
      title,
      subTitle,
      description,
      isPublish,
      category,
    });
    await blog.save();
    res.status(201).json({
      success: true,
      blog,
      message: "Blog upload Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    if (blogs.length == 0) {
      return res.status(404).json({
        success: false,
        message: "Blogs aren't found or no blogs are created yet!",
      });
    }
    res.status(200).json({
      success: true,
      blogs,
      message: "Blogs fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getAllBlogsForHomePage = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublish: true });
    if (blogs.length == 0) {
      return res.status(404).json({
        success: false,
        message: "Blogs aren't found or no blogs are created yet!",
      });
    }
    res.status(200).json({
      success: true,
      blogs,
      message: "Blogs fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog isn't found!",
      });
    }
    res.status(200).json({
      success: true,
      blog,
      message: "Blog fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Blog.deleteOne({ _id: id });
    if (result.deletedCount == 0) {
      return res.status(404).json({
        success: false,
        message: "Blog isn't found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog isn't find!",
      });
    }
    blog.isPublish = !blog.isPublish;
    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, comment, isApproved } = req.body;
    if (!name || !comment) {
      return res.status(404).json({
        success: false,
        message: "All fields are required!",
      });
    }
    const blogId = new mongoose.Types.ObjectId(id);
    const blog = await Blog.findOne(blogId);
    const userComment = new Comment({
      name,
      comment,
      blogId,
      isApproved,
      blogTitle: blog.title,
    });
    await userComment.save();
    res.status(200).json({
      success: true,
      message: "Thanks for the comment.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const allComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    if (comments.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No comments found!",
      });
    }
    res.status(200).json({
      success: true,
      comments,
      message: "Comments Fetched Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { id } = req.params;
    const blogComments = await Comment.find({ blogId: id, isApproved: true });
    if (blogComments.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No comments found!",
      });
    }
    res.status(200).json({
      success: true,
      blogComments,
      message: "Blog comments fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const approveComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findOne({ _id: id });
    comment.isApproved = !comment.isApproved;
    await comment.save();
    res.status(200).json({
      success: true,
      message: "Comment Approved!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Comment.deleteOne({ _id: id });
    if (result.deletedCount == 0) {
      return res.status(404).json({
        success: false,
        message: "Comment not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comment Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const generatedContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt +
        ` 
         Generate a blog in JSON format with the following structure:
            {
            "title": "string",
            "sections": [
                { "subheading": "string", "text": "string" },
                { "subheading": "string", "text": "string" },
                ...
            ]
            }

            Write in clear, simple language. Return only valid JSON, no extra commentary or formatting.
        `
    );
    res.status(200).json({
      success: true,
      content,
      message: "Content Generated!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
