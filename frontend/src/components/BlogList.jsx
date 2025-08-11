import React, { useEffect, useState } from "react";
import { blogCategories, blog_data } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const BlogList = ({blogs, setBlogs}) => {
  const [activeStatus, setActiveStatus] = useState("All");
  
  const fetchBlogs = async() => {
    try {
      const res = await axiosInstance.get(`/api/v1/get-blogs-approved`)
      if(res.data && res.data.blogs){
        setBlogs(res.data.blogs)
      }
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message)
      }
    }
  }

  useEffect(()=>{
    fetchBlogs()
  }, [])
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 my-10 relative">
        {blogCategories.map((item, idx) => (
          <div key={idx} className="relative">
            {item == activeStatus && (
              <motion.div
                layoutId="active-pill"
                // transition={{ type: "spring", stiffness: 500, damping: 30 }}
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary top-0 right-0 left-0 rounded-xl -z-5"
              ></motion.div>
            )}
            <button
              onClick={() => setActiveStatus(item)}
              className={` cursor-pointer px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 text-sm rounded-2xl ${
                item === activeStatus
                  ? "text-black shadow-sm shadow-gray-600"
                  : "bg-white text-gray-500"
              }`}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-30">
        {blogs
          .filter((item) =>
            activeStatus === "All" ? true : item.category === activeStatus
          )
          .map((item, idx) => (
            <BlogCard
              blog={item}
              key={idx}
              title={item?.title}
              category={item.category}
              image={item.blogImage}
              description={item.description}
              _id={item._id}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
