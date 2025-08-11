import React, { useState } from 'react'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  return (
    <div>
      <Header setBlogs={setBlogs} blogs={blogs} />
      <BlogList setBlogs={setBlogs} blogs={blogs} />
      <NewsLetter />
      <Footer/>
    </div>
  )
}

export default Home
