"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
       console.log("Form response",data );
       
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data
      });

      // Log the response for debugging
      console.log("API error",response);

      // Check for success response
      if (response.data.success) {
        toast.success('OTP sent to your email!'); // Show success toast
        navigate("/Otp_Verification",{
            state: data
        }); // Navigate to OTP verification page

        reset(); // Reset form after OTP is sent
      } else {
        toast.error('Email not found or OTP could not be sent.'); // Show error toast
      }

    } catch (error) {
        console.log(error);
        
      AxiosToastError(error); // Handle API errors
    }
  };

  return (
    <section className='w-full container mx-auto flex content-center items-center px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg'>Forgot Password</p>

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

          {/* Submit Button */}
          <button 
            type="submit" 
            className={` ${Object.values(watch()).every(el => el) ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white py-2 rounded font-semibold my-3 tracking-wide`} 
          >
            Send OTP
          </button>
        </form>

        <p>
            Already have an account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
