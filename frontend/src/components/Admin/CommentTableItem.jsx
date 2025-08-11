import React, { useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blogTitle, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);

  const deleteComment = async() => {
    try {
      const res = await axiosInstance.delete(`/api/v1/deleteComment/${_id}`)
      if(res.data && res.data.success){
        toast.success(res.data.message)
        fetchComments()
      }
    } catch (error) {
      if(error && error.response.data.message){
        toast.error(error.response.data.message)
      }
    }
  }

  const approveComment = async() => {
    try {
      const res = await axiosInstance.patch(`/api/v1/approveComment/${_id}`)
      if(res.data && res.data.success){
        toast.success("Comment approved successfully!")
      }
      fetchComments()
    } catch (error) {
      if(error && error.response.data.message){
        toast.error(error.response.data.message)
      }
    }
  }
  

  return (
    <div className="grid items-center text-sm max-sm:grid-cols-3 text-gray-700 grid-cols-4 max-sm:pl-1 max-sm:pr-7 md:px-5 py-3 border border-gray-300 min-md:h-[167.7px]">
      <div className="col-span-2 text-wrap p-3">
        <b>Blog: </b> {blogTitle}
        <br /> <br />
        <b>Name: </b> {comment.name}
        <br />
        <b>Comment: </b>{comment.comment}
      </div>
      <p className=" max-sm:hidden ">{blogDate.toLocaleDateString()}</p>
      <div className="">
        <div className="inline-flex items-center gap-4 ">
            {
                !comment.isApproved ? <IoMdCheckmark onClick={approveComment} size={24} className="hover:scale-110 transition-all cursor-pointer" /> : <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1 ">Approved</p>
            }
            <FaRegTrashAlt onClick={deleteComment} size={24} className="hover:scale-110 transition-all cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default CommentTableItem;
