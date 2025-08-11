import mongoose from "mongoose";
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {type: String, required: true},
    subTitle: {type: String},
    description: {type: String, required: true},
    category: {type: String, required: true},
    isPublish: {type: Boolean, default: false},
    blogImage: {type: String, required: true}
}, {timestamps: true})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog