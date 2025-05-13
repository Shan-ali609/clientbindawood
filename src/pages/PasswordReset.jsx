"use client"
import React, { useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PasswordReset = () => {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation()
  const watchPassword = watch('password', '');
  const watchConfirmPassword = watch('confirmPassword', '');

  const onSubmit = async (data) => {
   
    console.log("Form data:", data);
    console.log("Email from location:", location?.state?.email);
    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: {
          email: location?.state?.email, // Ensure email is being passed correctly
          newPassword: data.password, // Change this to newPassword to match backend
          confirmPassword: data.confirmPassword, // This stays the same
        }
        
      });
       

       if (response.data.success) {
        toast.success(response.data.message); // Using react-toastify for success
        reset();
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='font-semibold text-lg'>Reset Password</p>

        <form className='grid gap-4 mt-6' onSubmit={handleSubmit(onSubmit)}>

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
          </div>

          {/* Confirm Password Field */}
          <div className='grid gap-1'>
            <label htmlFor='confirmPassword'>Confirm Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                className='w-full outline-none'
                name='confirmPassword'
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === watchPassword || 'Passwords do not match'
                })}
                placeholder='Enter your confirm password'
              />
              <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={` ${Object.values(watch()).every(el => el) ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" } text-white py-2 rounded font-semibold my-3 tracking-wide`} 
            disabled={!Object.values(watch()).every(el => el)}
          >
            Submit
          </button>
        </form>

      </div>
    </section>
  );
};

export default PasswordReset
