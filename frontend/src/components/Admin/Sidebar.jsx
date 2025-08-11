import {  List } from 'lucide-react'
import React, { useContext } from 'react'
import {  FaRegComment } from 'react-icons/fa6'
import { FiHome } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { RiBloggerLine } from "react-icons/ri";
import { UserContext } from '../../App'


const Sidebar = () => {
  const {displaySideBar, setDisplaySideBar} = useContext(UserContext)
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full py-6 pl-3 gap-3'>
      <NavLink onClick={()=>setDisplaySideBar(false)} className={({isActive})=>`flex items-center gap-3 py-3.5  px-1 md:px-9  min-w-50 cursor-pointer ${isActive ? 'bg-primary/10 border-r-4 border-primary' : ''}`} end={true} to='/admin' >
        <FiHome size={24} />
        <p className='inline-block'>Dashboard</p>
      </NavLink>

      <NavLink onClick={()=>setDisplaySideBar(false)} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9  min-w-50 cursor-pointer ${isActive ? 'bg-primary/10 border-r-4 border-primary' : ''}`} end={true} to='/admin/addblog' >
        <RiBloggerLine size={24} />
        <p className='inline-block'>Add Blog</p>
      </NavLink>

      <NavLink onClick={()=>setDisplaySideBar(false)} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9  min-w-50 cursor-pointer ${isActive ? 'bg-primary/10 border-r-4 border-primary' : ''}`} end={true} to='/admin/listblog' >
        <List size={24} />
        <p className='inline-block'>List Blog</p>
      </NavLink>

      <NavLink onClick={()=>setDisplaySideBar(false)} className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9  min-w-50 cursor-pointer ${isActive ? 'bg-primary/10 border-r-4 border-primary' : ''}`} end={true} to='/admin/comments' >
        <FaRegComment size={24} />
        <p className='inline-block'>Comments</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
