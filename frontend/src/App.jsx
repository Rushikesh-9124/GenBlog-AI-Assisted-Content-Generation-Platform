import React, { createContext, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import Layout from "./pages/Admin/Layout";
import Dashboard from "./pages/Admin/Dashboard";
import AddBlog from "./pages/Admin/AddBlog";
import ListBlog from "./pages/Admin/ListBlog";
import Comments from "./pages/Admin/Comments";
import Login from "./components/Admin/Login";
import 'quill/dist/quill.snow.css' 
import { ToastContainer, toast } from 'react-toastify';

export const UserContext = createContext();
const App = () => {
  
  const [displaySideBar, setDisplaySideBar] = useState(false)
  const token = localStorage.getItem("token")
  return (
    <UserContext.Provider value={{token, displaySideBar, setDisplaySideBar}}>
      <div className="w-full">
      <ToastContainer />
        <div className="relative z-55">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/login' element={token ? <Root2 /> : <Login />} />
          <Route path="/admin" element={token ? <Layout /> : <Root />}>
            <Route index element={<Dashboard />} />
            <Route path="addblog" element={<AddBlog />} />
            <Route path="listblog" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;


const Root = () => {
  const token = localStorage.getItem("token")
  return token ? <Navigate to='/admin'/> : <Navigate to='/' /> 
}
const Root2 = () => {
  return <Navigate to='/admin' /> 
}