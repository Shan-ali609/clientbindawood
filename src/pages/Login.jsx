"use client";
import React, { useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import fetchUser from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';
const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      });

      // Log response for debugging
      console.log("data",data);

      if (response.data.success) {
        toast.success(response.data.message); // Show success toast
        localStorage.setItem('accesstoken',response.data.data.accesstoken)
        localStorage.setItem('refreshtoken',response.data.data.refreshtoken)
         const userdetails = await fetchUser()
          dispatch(setUserDetails(userdetails.data))
        reset(); // Reset form after successful login
        navigate("/"); // Navigate to the home page
      } else {
        toast.error("Login failed!"); // Handle login failure
      }
    } catch (error) {
      AxiosToastError(error); // Handle API errors
    }
  };

  return (
    <section className='w-full container mx-auto flex content-center items-center px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p>Welcome to Binkeyit</p>

        <form className='grid gap-4 mt-6' onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className='grid gap-1'>
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              name='email'
              {...register('email', { 
                required: 'Email is required', 
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'Invalid email format'
                }
              })}
              placeholder='Enter your email'
            />
            {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className='grid gap-1'>
            <label htmlFor='password'>Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                className='w-full outline-none'
                name='password'
                {...register('password', { 
                  required: 'Password is required', 
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                placeholder='Enter your password'
              />
              <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
            <Link to={'/forgot-password'} className='block ml-auto hover:text-blue-700'>Forgot_Password</Link>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={` ${Object.values(watch()).every(el => el) ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white py-2 rounded font-semibold my-3 tracking-wide`} 
            disabled={!Object.values(watch()).every(el => el)}
          >
            Login
          </button>
        </form>

        <p>
          Don't have an account? <Link to={"/register"} className='font-semibold text-green-700 hover:text-green-800'>Register</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
