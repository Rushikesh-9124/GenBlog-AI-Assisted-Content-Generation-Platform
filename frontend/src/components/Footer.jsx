import React from 'react'
import { assets, footer_data } from '../assets/assets'
import { Section } from 'lucide-react'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500 ">
        <div className="flex flex-col ">
            <img src={assets.GenBlog2} className="w-22 sm:w-44 " />
            <p className='max-w-[410px] mt-6'>GenBlog is an AI-assisted blogging platform that lets users generate, edit, and publish blog posts effortlessly. It leverages OpenAI/Gemini APIs for content creation and supports full CRUD operations.</p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
            {
                footer_data.map((item, idx)=> (
                    <div key={idx}>
                        <h3 className="font-semibold text-base text-gray-900 md:mb-2-5 mb-2 ">{item.title}</h3>
                        <ul className='text-sm space-y-1'>
                            {item.links.map((item, idx)=>(
                                <li key={idx}><a href="#" className='hover:underline transition-all'>{item}</a></li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div>

      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500'>copyright 2025 &copy; GenBlog — AI-Assisted Content Generation Platform, All Rights Reserved!</p>
    </div>
  )
}

export default Footer
