import React from 'react'
import { useForm } from "react-hook-form"
import { Link , useNavigate , useLocation } from "react-router-dom";
import { setAuthCookie } from "../utils/cookie.js";
import FlashMessage from "./FlashMessage";
import { useState , useEffect } from 'react';
const Login = () => {
  const location = useLocation();
  const flashMessage = location.state?.flashMessage;

  const [showFlash, setShowFlash] = useState(!!flashMessage);

  useEffect(() => {
    if (showFlash) {
      const timer = setTimeout(() => {
        setShowFlash(false); 
      }, 2000);
      return () => clearTimeout(timer); 
    }
  }, [showFlash]);

  let navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    let user = {
      name : data.username,
      password : data.password
    }
    try{
      let responce = await fetch(`${backendUrl}/login` , {
        method : 'POST' ,
        headers : {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user })
      })
  
      let responceData = await responce.json()
      console.log(`responsedata ${responceData}`)
      if (responceData.token) {
        console.log("inside token ")
        setAuthCookie(responceData.token);
        navigate("/");
        alert('User logged in successfully!');
      } else {
        alert(responceData.message);
      }
    }catch(e){
      console.error('Network error:', e);
      alert('Network error. Please try again.');
    }
    
  }

  return (
    <div className='p-4 w-full min-h-screen flex justify-center items-center bg-gray-700'>
      {showFlash && flashMessage && (
        <FlashMessage
          message={flashMessage}
          onClose={() => setShowFlash(false)}
        />
      )}
      <div className='w-full max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg'>
        <h2 className='text-center text-3xl font-semibold text-white mb-6'>Login</h2>
        
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <input 
              className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              type='text' 
              placeholder='Username' 
              {...register('username', { 
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters long' },
              })}
            />
            {errors.username && <p className='text-red-600 text-sm'>{errors.username.message}</p>}
          </div>

          <div className='mb-6'>
            <input 
              className='w-full p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
              type='password' 
              placeholder='Password' 
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className='text-red-600 text-sm'>{errors.password.message}</p>}
          </div>

          <button 
            type='submit' 
            disabled={isSubmitting} 
            className='w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors'
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-300'>
            Don't have an account? <Link  to="/signup" className='text-indigo-400 hover:underline'>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
