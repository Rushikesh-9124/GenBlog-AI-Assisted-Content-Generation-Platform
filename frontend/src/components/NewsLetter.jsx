import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold '>Never miss a Blog!</h1>
      <p className=' md:text-lg text-gray-500/70 pb-8'>Subscribe to get the latest blog, new tech and exclusive news!</p>
      <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12 shadow-md shadow-gray-400 rounded-lg group '>
        <input type="text" className='border border-gray-300 rounded-md h-full border-r-0 px-3 text-gray-500 outline-0 w-full rounded-r-none  focus:border-black ' placeholder='Enter you Email Address...' required/>
        <button type="submit" className='px-8 md:px-12 h-full text-white bg-primary/80 hover:bg-primary transition-all rounded-md rounded-l-none cursor-pointer '>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
