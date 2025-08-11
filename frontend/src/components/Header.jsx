import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { SearchIcon, Star } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Header = ({blogs, setBlogs}) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("")

  const fetchBlogs = async(e) => {
    e.preventDefault()
    setBlogs([])
    try {
      const res = await axiosInstance.get(`/api/v1/search-notes?query=${query}`)
      if(res.data && res.data.success){
        setBlogs(res.data.matchingBlogs)
      }
      
    } catch (error) {
      
      if(error && error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-4 sm:mt-15 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary ">
          <p className="">New: AI Feature Integrated</p>
          <Star size={15} />
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your Own <span className="text-primary">Blogging</span>{" "}
          <span className="block ">Platform.</span>
        </h1>
        <p className="my-6 mb-4 sm:my-8 sm:mb-4 max-w-2xl m-auto max-sm:text-sm text-gray-500">
          Every idea begins with a spark. Whether it’s a bold opinion or a quiet
          reflection, GenBlog is where your words find their rhythm.
        </p>
        <form>
          <div className="w-[200px] sm:w-[400px] border  m-auto flex items-center justify-between gap-2 rounded-lg overflow-hidden shadow-sm shadow-gray-500">
            <input
              ref={inputRef}
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              type="text"
              className="py-2 ml-3  sm:ml-5 w-[120px] sm:w-[300px] outline-none"
              placeholder="Search for blogs..."
              required
            />
            <button
              type="submit"
              onClick={fetchBlogs}
              className="bg-primary/70 hover:bg-primary/90 cursor-pointer py-2 px-3 "
            >
              <span className="hidden sm:block">Search</span>{" "}
              <SearchIcon className="block sm:hidden text-sm" />
            </button>
          </div>
        </form>
      </div>
      <img
        src={assets.gradientBackground}
        className="absolute -top-50 -z-1 opacity-50"
        alt=""
        draggable={false}
      />
    </div>
  );
};

export default Header;
