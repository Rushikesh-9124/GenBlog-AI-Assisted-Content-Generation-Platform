import mongoose from "mongoose";
const Schema = mongoose.Schema

const userComment = new Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    isApproved: {type: Boolean, default: false},
    blogTitle: {type: String, required: true}
}, {timestamps: true})

const Comment = mongoose.model("Comment", userComment)
export default Comment