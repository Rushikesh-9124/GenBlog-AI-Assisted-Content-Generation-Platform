import React, { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { assets, dashboard_data } from "../../assets/assets";
import { FaRegCommentAlt } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { MdEditNote } from "react-icons/md";
import BlogTableItem from "../../components/Admin/BlogTableItem";
import axiosInstance from "../../utils/axiosInstance";

const Dashboard = () => {
  const [dashbaordData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  

  // const [blogs, setBlogs] = useState([]);
  
  const fetchDashboard = async () => {
    try {
      const blogsRes = await axiosInstance.get(`/api/v1/get-blogs`);
      const commentsRes = await axiosInstance.get(`/api/v1/allcomments`);
  
      if (blogsRes.data && blogsRes.data.success) {
        const blogs = blogsRes.data.blogs;
        const publishedCount = blogs.filter(blog => blog.isPublish).length;
        const draftsCount = blogs.filter(blog => !blog.isPublish).length;
  
        setDashboardData(prev => ({
          ...prev,
          blogs: publishedCount,
          drafts: draftsCount,
          recentBlogs: blogs.slice(0, 5) // optional: get recent 5 blogs
        }));
      }
  
      if (commentsRes.data && commentsRes.data.success) {
        setDashboardData(prev => ({
          ...prev,
          comments: commentsRes.data.comments.length
        }));
      }
  
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  
  
  useEffect(() => {
    fetchDashboard()
  }, []);

  return (
    <div className="flex-1 p-4 h-full  md:p-6 bg-blue-50/50 ">
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="flex items-center bg-white p-4 min-w-58 rounded-md shadow-md cursor-pointer hover:scale-102 shadow-gray-400 gap-5 transition-all">
          <div className="bg-primary/30 p-3 rounded-lg">
            <MdOutlineDashboard size={24} />
          </div>
          <div className="">
            <p className="text-lg font-semibold text-gray-600">
              {dashbaordData?.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>
        <div className="flex items-center bg-white p-4 min-w-58 rounded-md shadow-md cursor-pointer hover:scale-102 shadow-gray-400 gap-5 transition-all">
          <div className="bg-primary/30 p-3 rounded-lg">
            <FaRegCommentAlt size={24} />
          </div>
          <div className="">
            <p className="text-lg font-semibold text-gray-600">
              {dashbaordData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>
        <div className="flex items-center bg-white p-4 min-w-58 rounded-md shadow-md cursor-pointer hover:scale-102 shadow-gray-400 gap-5 transition-all">
          <div className="bg-primary/30 p-3 rounded-lg">
            <LuNotebookPen size={24} />
          </div>
          <div className="">
            <p className="text-lg font-semibold text-gray-600">
              {dashbaordData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600 ">
          <MdEditNote size={24} />
          <p>Latest Blogs</p>
        </div>
        <div
          className="relative max-w-4xl overflow-x-visible overflow-y-visible shadow rounded-lg border border-gray-500 scrollbar-hide bg-white"
        >
          <div className="grid grid-cols-4 md:grid-cols-5  gap-2 px-3 md:px-5 py-4 rounded-md bg-gray-400">
            <p className="col-span-2 text-nowrap text-start flex gap-5 items-center ">
              <span>#</span> BLOG TITLE
            </p>
            <p className="hidden md:block">DATE</p>
            <p className="">STATUS</p>
            <p>ACTIONS</p>
          </div>
          {dashbaordData.recentBlogs.map((item, idx) => (
            <BlogTableItem
              blog={item}
              key={idx}
              fetchBlogs={fetchDashboard}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
