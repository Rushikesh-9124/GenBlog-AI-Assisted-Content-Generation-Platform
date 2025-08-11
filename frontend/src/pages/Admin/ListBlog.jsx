import React, { useState } from "react";
import BlogTableItem from "../../components/Admin/BlogTableItem";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    
    try {
      const res = await axiosInstance.get(`/api/v1/get-blogs`)
      if(res.data && res.data.success){
        setBlogs(res.data.blogs)
        console.log(res.data.blogs)
      }
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data. message)
      }
    }
  };

  useState(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All Blogs</h1>
      <div
        className="relative max-h-4/5 mt-4 max-w-4xl overflow-visible shadow rounded-lg border border-gray-500 scrollbar-hide bg-white"
      >
        <div className="grid grid-cols-4 md:grid-cols-5 overflow-y-auto  gap-2 px-3 md:px-5 py-4 rounded-md bg-gray-400">
          <p className="col-span-2 text-nowrap text-start flex gap-5 items-center ">
            <span>#</span> BLOG TITLE
          </p>
          <p className="hidden md:block">DATE</p>
          <p className="">STATUS</p>
          <p>ACTIONS</p>
        </div>
        <div className="grid  overflow-y-auto">
          {blogs.map((item, idx) => (
            <BlogTableItem
              blog={item}
              key={idx}
              fetchBlogs={fetchBlogs}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
