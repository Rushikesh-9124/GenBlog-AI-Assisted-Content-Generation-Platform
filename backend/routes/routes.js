import express from "express";
const router = express.Router();
import { registerUser, loginUser } from "../controllers/adminController.js";
import {
  addBlog,
  addComment,
  allComments,
  approveComment,
  deleteBlog,
  deleteComment,
  generatedContent,
  getAllBlogs,
  getAllBlogsForHomePage,
  getBlogById,
  getBlogComments,
  togglePublish,
} from "../controllers/blogController.js";
import { authenticateToken } from "../utility.js";
import upload from "../middleware/uploadMiddleware.js";
import Blog from "../models/Blog.js";

router.post("/register", registerUser);
router.post("/login", loginUser);

//Blog Routes
router.post("/upload", authenticateToken, upload.single("image"), addBlog); // upload blog -> done
router.get("/get-blogs", authenticateToken, getAllBlogs); //get all the blogs -> done
router.get("/get-blogs-approved", getAllBlogsForHomePage); //get all the blogs -> done
router.get("/get-blogs/:id", getBlogById); //get blog with id
router.delete("/deleteblog/:id", authenticateToken, deleteBlog); //delete blog wih id
router.patch("/publishblog/:id", authenticateToken, togglePublish); //set isPublish to true (if true -> false) -> done
router.post("/comment/:id", addComment); //add comment with blogId -> done
router.get("/allcomments", authenticateToken, allComments); //get all comments -> done
router.get("/getblogcomments/:id", getBlogComments); // get comments for blog with blog id -> done
router.patch("/approveComment/:id", authenticateToken, approveComment); // isApproved toggle -> done
router.delete("/deleteComment/:id", authenticateToken, deleteComment); // delete comment -> done

router.get("/search-notes", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(404).json({
      success: false,
      message: "Search query is required!",
    });
  }
  try {
    const matchingBlogs = await Blog.find({
      isPublish: true,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { subTitle: { $regex: new RegExp(query, "i") } },
        { category: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
      ],
    });

    if (matchingBlogs.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No blogs found!",
      });
    }
    res.status(200).json({
      success: true,
      matchingBlogs,
      message: "Blogs fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});

router.post('/generate', authenticateToken, generatedContent)
export default router;
