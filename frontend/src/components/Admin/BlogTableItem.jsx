import React from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const BlogTableItem = ({ blog, fetchBlogs, idx }) => {
  const { title, createdAt } = blog;
  const blogDate = new Date(createdAt);

  const publishBlog = async() => {
    try {
      const res = await axiosInstance.patch(`/api/v1/publishblog/${blog._id}`)
      if(res.data && res.data.success){
        fetchBlogs()
        toast.success(res.data.message)
      }
    } catch (error) {
      if(error && error.response.data.message){
        toast.error(error.response.data.message)
      }
    }
  }
  const deleteblog = async() => {
    try {
      const res = await axiosInstance.delete(`/api/v1/deleteblog/${blog._id}`)
      if(res.data && res.data.success){
        toast.success(res.data.message)
        fetchBlogs()
      }
    } catch (error) {
      
    }
  }
  return (
    <div
      className="relative z-0 transition-all duration-300 ease-in-out
  hover:scale-[1.05] hover:z-10 hover:shadow-lg bg-white
  grid grid-cols-4 md:grid-cols-5 gap-2 px-3 md:px-5 md:pr-14 py-3 rounded-md items-center max-h-[100px] border border-gray-50"
    >
      <div className="col-span-2 text-nowrap text-start flex gap-4 items-center">
        <span>{idx+1} </span>
        <p className="text-wrap max-sm:text-xs text-gray-500 group-hover:text-black">
          {title}
        </p>
      </div>
      <p className="hidden md:block">{blogDate.toDateString()}</p>
      <p
        className={`max-sm:text-xs max-sm:w-[50px] ${blog.isPublish ? "text-green-800" : "text-orange-700"}`}
      >
        {blog.isPublish ? "Published" : "Unpublished"}
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-4">
        <button
          onClick={publishBlog}
          className={` border px-1 md:px-2 max-h-[30px]  rounded cursor-pointer`}
        >
          {blog.isPublish ? "Unpublish" : "Publish"}
        </button>
        <div className="bg-red-50 rounded-full p-1 hover:bg-red-400 group">
        <IoMdClose
          onClick={deleteblog}
          size={15}
          className="hover:scale-108 transition-all group-hover:text-black text-gray-500 cursor-pointer" 
        />
        </div>
        
      </div>
    </div>
  );
};

export default BlogTableItem;
