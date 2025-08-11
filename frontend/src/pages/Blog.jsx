import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";
import Loading from "../components/Loading";
import moment from "moment";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import Footer from "../components/Footer";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Blog = () => {
  const { id } = useParams();
  const [data, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")

  const fetchBlogData = async () => {
    try {
      const res = await axiosInstance.get(`/api/v1/get-blogs/${id}`)
      if(res.data && res.data.blog){
        setBlogs(res.data.blog)
      }
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message)
      }
    }
  };
  
  const addComment = async(e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post(`/api/v1/comment/${id}`, {
        name, comment
      })
      if(res.data && res.data.success){
        toast.success("Comment Added, please wait for approval!")
      }
      fetchBlogData()
      fetchComments()
    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message)
      }
    }
  }
  
  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/api/v1/getblogcomments/`+id)
      if(res.data && res.data.success){
        setComments(res.data.blogComments)
      }
    } catch (error) {
      toast.error(error)
    }
  };

  const [isDisable, setIsDisable] = useState(true)
  useEffect(()=>{
    if(name.trim().length == 0 || comment.trim().length == 0){
      setIsDisable(true);
    }
    else{
      setIsDisable(false)
    }
  }, [name, comment])

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);
  
  return data ? (
    <div className="relative">
      <img
        draggable={false}
        className="absolute -top-50 -z-10 opacity-50"
        src={assets.gradientBackground}
        alt=""
      />
      <div className="text-center mt-10 sm:mt-20 text-gray-600">
        <p className="text-primary my-2 ">
          Published on {moment(data.createdAt).format("Do MMM YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl w-full mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto ">{data.subTitle}</h2>
        <p className="py-1 px-4 rounded-full shadow-sm shadow-gray-600 border inline-block mb-6 border-primary/35  bg-primary/5 font-medium text-primary">
          Aurthor Morgan
        </p>
      </div>
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img
          loading="lazy"
          src={data.blogImage}
          className="rounded-3xl mb-4 shadow-sm shadow-gray-300"
          alt=""
        />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="rich-text max-w-3xl mx-auto"
        ></div>

        {/* Comment Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4 ">Commnets ({comments?.length})</p>
          <div className="flex flex-col gap-4">
            {comments?.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded tetx-gray-500"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} className="w-6" alt="" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{item.comment}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-sm">
                  {moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Section */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add Comment</p>
          <form onSubmit={addComment} action="" className="flex flex-col items-start gap-4 max-w-lg">
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full outline-0 border p-2 border-gray-300 rounded pl-5" />
            <textarea onChange={(e)=>setComment(e.target.value)} value={comment} name="" className="pl-5 w-full outline-0 h-48 rounded border border-gray-300 p-2 " id="" cols="30" rows="10" placeholder="Comment" required></textarea>
            <button  disabled={isDisable} type="submit"  className={`w-full border py-1 rounded bg-primary/80  hover:bg-primary  ${isDisable ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Submit</button>
          </form>
        </div>
        {/* Share Buttons */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4 ">Share this article on social media</p>
          <div className="flex gap-4 items-center">
            <span className="border p-2 rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:scale-103 transition-all"><FiFacebook className="text-blue-900" size={24} /></span>
            <span className="border p-2 rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:scale-103 transition-all"> <FaXTwitter className="text-black" size={24}/></span>
            <span className="border p-2 rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:scale-103 transition-all"><FiInstagram  className="text-red-700" size={24}/></span>
            <span className="border p-2 rounded-full shadow-lg shadow-gray-400 cursor-pointer hover:scale-103 transition-all"><FaWhatsapp className="text-green-600" size={24}/></span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loading />
  );
};

export default Blog;
