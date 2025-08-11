import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { UserContext } from "../App";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const {token,  displaySideBar, setDisplaySideBar} = useContext(UserContext)
  
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const displayLogin = (pathName.startsWith('/login') ||  pathName.startsWith('/admin')) ? false : true;
  const displayHamburger = pathName.startsWith('/admin')
  const displayLogout = pathName.startsWith('/admin') 
  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }
  return (
    <div className={`bg-white flex justify-between items-center py-5 px-3 sm:px-8 xl:px-12 cursor-pointer border-b border-gray-300 shadow-md`}>
      <div className="flex gap-3 items-center">
      {
        token && displayHamburger && (
          displaySideBar ? <IoMdClose size={28} className="block md:hidden" onClick={()=>setDisplaySideBar(prev => !prev)}/> : <IoMenu size={28} className="block md:hidden" onClick={()=>setDisplaySideBar(prev => !prev)}/>
        )
      }
      <img
        draggable={false}
        onClick={() => navigate("/")}
        src={assets.GenBlog2}
        alt="icon"
        className="w-32 sm:w-44 rounded-md"
      />
      </div>
      {displayLogin  && (
        <button
          className="text-white px-10 py-2.5 bg-primary flex items-center  justify-between gap-2 rounded-full text-sm cursor-pointer "
          onClick={() => navigate("/login")}
        >
          Login <ArrowRight />
        </button>
      )}
      {displayLogout && (
        <button
          className="text-white px-10 py-2.5 bg-primary/90 flex items-center  justify-between gap-2 rounded-full text-sm cursor-pointer hover:bg-primary"
          onClick={handleLogout}
        >
          Logout 
        </button>
      )}
    </div>
  );
};

export default Navbar;
