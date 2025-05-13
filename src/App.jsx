import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'; 
import fetchUser from './utils/fetchUserDetails'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './store/userSlice'
import Axios from './utils/Axios'
import AxiosToastError from './utils/AxiosToastError'
import SummaryApi from './common/SummaryApi'
import { setallCategory , setallSubCategory, setloadingcategory } from './store/productslice'

function App() {
   const dispatch = useDispatch()
  const fetchUserDetail = async()=>{
    const userData = await fetchUser()
    // console.log("User ",userData.data );
    dispatch(setUserDetails(userData.data ))
  }
     
  const fetchallcategorydata = async () => {
       try {
        dispatch(setloadingcategory(true))
         const response = await Axios({
           ...SummaryApi.get_category,
         });
        //  console.log("Respponse data", response);
         
         const { data: responseData } = response;
        //  console.log("data", responseData.data);
   
         if (responseData.success) {
         
          
          dispatch(setallCategory(responseData.data))
          
         }
       } catch (error) {
         AxiosToastError(error);
       }finally{
        dispatch(setloadingcategory(false))
       }
     };
     const fetchallSubcategorydata = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.get_subcategory,
        });
       //  console.log("Respponse data", response);
        
        const { data: responseData } = response;
       //  console.log("data", responseData.data);
  
        if (responseData.success) {
        
         
         dispatch(setallSubCategory(responseData.data))
         
        }
      } catch (error) {
        AxiosToastError(error);
      }
    };
  useEffect(()=>{
    fetchUserDetail()
    fetchallcategorydata()
    fetchallSubcategorydata()
  },[])
  return (
    <>
     <Header />
     <main className='min-h-[78vh]'>
      <Outlet />
     </main>
     <Footer />
     <Toaster />
    </>
  )
}

export default App
