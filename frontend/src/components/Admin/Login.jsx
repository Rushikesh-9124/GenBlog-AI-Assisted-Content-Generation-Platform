import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { validateEmail } from "../../utils/healper";
import axiosInstance from "../../utils/axiosInstance";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [isDisabled, setIsDisabled] = useState(true)
  useEffect(()=>{
    if(email.length == 0 || password.length == 0){
      setIsDisabled(true)
    }
    else{
      setIsDisabled(false)
    }
  }, [email, password])
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Invalid Email!")
      return
    }
    if(password.length < 8){
      setError("Password length must be greater than 7!")
      return
    }
    try {
      const res = await axiosInstance.post('/api/v1/login', {
        email, password
      })
      if(res.data.success){
        localStorage.setItem("token", res.data.accessToken)
        navigate('/admin')
        window.location.reload()
      }
    } catch (error) {
      
    }
  }

  
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-80px)]'>
      <div className="relative w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg ">
        <div className="flex flex-col  items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold"><span className='text-primary'>Admin</span> Login</h1>
            <p className=' font-light'>Enter your credentials to access the admin panel!</p>
          </div>
        </div>
        <form  className='flex flex-col gap-4 m-5' onSubmit={handleSubmit}>
            <div className=" w-full flex flex-col  gap-2 mb-3">
              <label className='w-[100px]  ml-2 rounded-lg text-gray-500' htmlFor="">Email</label>
              <div className="w-full  border-b border-gray-300 ">
              <input onChange={(e)=>setEmail(e.target.value)} type="text" className='w-ful  px-3 py-1 outline-0' required placeholder='test@example.com' value={email} />
              </div>
            </div>

            <div className=" w-full flex flex-col gap-2 mb-2">
              <label className='w-[100px] text-gray-500'>Passoword</label>
              <div className="w-full border-b border-gray-300  flex items-center">
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type={`${showPassword ? "text" : "password"}`} className='w-full px-3 py-1 outline-0' required placeholder='*******'  />
              {
                !showPassword ? <FaRegEye className="cursor-pointer" onClick={()=>setShowPassword(prev => !prev)} /> : <FaRegEyeSlash className="cursor-pointer" onClick={()=>setShowPassword(prev => !prev)} />
              }
              </div>
            </div>
            {
              error && (<p className="text-center text-xs text-red-500">{error}</p>)
            }
            <button disabled={isDisabled} type="submit"  className={`w-full py-1.5 bg-primary/80 hover:bg-primary ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Login</button>
          </form>
      </div>
    </div>
  )
}

export default Login
