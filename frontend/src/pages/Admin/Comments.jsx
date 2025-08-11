import React, { useEffect, useState } from "react";
import { comments_data } from "../../assets/assets";
import CommentTableItem from "../../components/Admin/CommentTableItem";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/api/v1/allcomments`)
      if(res.data && res.data.success){
        setComments(res.data.comments)
      }
    } catch (error) {
      if(error && error.response.data.message){
        toast.error("Unable to load comments!")
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 ">
      <div className="flex justify-between  items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === "Not Approved" ? "text-primary" : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>
      <div className="relative max-h-4/5 max-sm:max-h-[610px] max-w-3xl overflow-y-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <div className="grid text-sm max-sm:grid-cols-3 text-gray-700 grid-cols-4 px-5 py-3 bg-gray-400">
          <p className="col-span-2">BLOG TITLE & COMMENT</p>
          <p className=" max-sm:hidden ">DATE</p>
          <p>ACTIONS</p>
        </div>
        {
          comments.filter((item) => {
            if(filter == 'Approved') return item.isApproved === true;
            return item.isApproved === false
          }).map((item, idx)=>(
            <CommentTableItem key={idx} fetchComments={fetchComments} comment={item}/>
          ))
        }
      </div>
    </div>
  );
};

export default Comments;
