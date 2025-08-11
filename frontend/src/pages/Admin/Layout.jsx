import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import { UserContext } from "../../App";

const Layout = () => {
  const { displaySideBar, setDisplaySideBar } = useContext(UserContext);
  return (
    <>
      <div className="flex max-sm:h-[calc(105vh)] h-[calc(100vh-80px)] relative">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        {
          <div
            className={`absolute md:hidden  h-full w-64  z-50 transform transition-transform duration-300 ease-in-out ${
              displaySideBar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className={`relative z-50 bg-white w-full h-full `}>
              <Sidebar />
            </div>
          </div> 
        }
        {displaySideBar && (
              <div
                onClick={() => setDisplaySideBar((prev) => !prev)}
                className="w-screen h-screen bg-black/30 fixed top-0 left-0 z-40"
              ></div>
            )}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
