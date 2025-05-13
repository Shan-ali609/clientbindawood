import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import uploadimage from "../utils/uploadimage";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const UploadSubcategorymodel = ({close,fetchdata}) => {
    const [subcategoryData , setsubcategoryData] = useState({
        name : '',
        image : '',
        Category : []
    })
    const [loading , setloading] = useState(false)
    const allCategory = useSelector(state=>state.product.allCategory)
    // console.log("All categroy data",allCategory );
    
    const handleonchange = (e)=>{
       const {name , value} = e.target
       setsubcategoryData((pre)=>{
            return{
             ...pre,
             [ name ] : value
            }
         })
    }
    const handleuploadSubCategoryimage = async(e)=>{
         const file  = e.target.files[0]

         if (!file) {
          return
         }

         setloading(true)
         try {
           const resposne = await uploadimage(file)
           console.log("resposne",resposne )
           const { data : Imageresponse} = resposne
           // console.log(Imageresponse.data.url);
                
           setsubcategoryData((pre)=>{
             return{
                 ...pre,
                 image : Imageresponse.data.url
               }
           })
           
         } catch (error) {
           AxiosToastError(error)
         }finally{
           setloading(false)
         }
       

    }
    const handleRemoveSelectedCategory = (categoryId) => {
      // console.log("categoryid",categoryId );
      
      setsubcategoryData((prev) => ({
        ...prev,
        Category: prev.Category.filter((category) => category._id !== categoryId), // Remove ID properly
      }));
    };     
    const handlesubmitsubcategory = async(e)=>{
      e.preventDefault()
      try {
        setloading(true)

        const response = await Axios({
          ...SummaryApi.add_subcategory,
             data : {
              ...subcategoryData,
              Category : subcategoryData.Category
             }
        })
          // console.log("Response Data", response);
          const { data : responsedata} = response
          if (responsedata.success) {
            toast.success(responsedata.message)
            fetchdata()
            if (close) {
              close()   
            }
          }
          
      } catch (error) {
        AxiosToastError(error)
    } finally {
          setloading(false)
    }
    }
    
  
    
  return (
    <section className="">
    <div className="top-0 bottom-0 left-0 right-0 fixed bg-neutral-600 z-50 flex items-center  content-center rounded">
       <div className="bg-white max-w-4xl w-full rounded mx-2 lg:mx-auto">
         <div className="flex items-center justify-between p-2 ">
            <p className="font-semibold text-2xl text-black">SubCategory</p>
             <div onClick={close} className=" cursor-pointer  ">
                        <RxCross2 />
              </div>
            </div> 

            <form action="" onSubmit={handlesubmitsubcategory} >
            <div className=" px-2 flex flex-col gap-2">
            <label id="subcategoryname">Name</label>
            <input type="text" id="subcategoryname" placeholder="Enter Category name" value={subcategoryData.name}
             onChange={handleonchange}  name="name"
            className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded' />
          </div>

                <div className="p-2 flex flex-col">
                    <p>Image</p>
                    <div className="flex gap-4 flex-col lg:flex-row items-center">
                        <div  className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                                  {
                                    subcategoryData.image? (
                                        <img 
                                        alt="category"
                                        src={subcategoryData.image}
                                        className="h-full w-full object-scale-down"
                                        />
                                    ):(
                                
                                      <p className='text-sm text-neutral-500'>No Image</p>
                                     
                                    )
                                  }
                        </div>
                        <label htmlFor="addsubcategory">
                        <div  className={`
                            ${!subcategoryData.name ? "bg-gray-300" : "border-primary-200 hover:bg-primary-100" }  
                                px-4 py-2 rounded cursor-pointer border font-medium
                            `}>
                               {
                                  loading ? (
                                    <div>loading..</div>
                                  ):(
                                    <div>
                                    Upload Image
                                    </div>
                                  )
                                }
                            </div>
                            <input disabled={!subcategoryData.name} onChange={handleuploadSubCategoryimage}  type='file' id='addsubcategory' className='hidden'/>
                        </label>
                    </div>
                </div>

                <div className="m-2 grid gap-1" >
                  {/* select category */}
                  <label htmlFor="">Select Category</label>
                      {/* remove category */}
                      <div className="flex flex-wrap gap-2 px-2 ">
                          {
                            subcategoryData.Category.map((category,index)=>{
                                    return(
                                      
                                      <p key={category._id+"Selected value"} className="bg-white shadow-lg px-2 border flex items-center justify-between">{category.name}
                                      <div onClick={()=>{handleRemoveSelectedCategory(category._id)}} className=" cursor-pointer  ">
                                     <RxCross2 />
                                      </div>
                                      </p>
                                    )
                            })
                          }
                      </div>
                      {/* selected category details */}
                    <select className="w-full text-[15px] outline-none border focus-within:border-primary-200  rounded" 
                      onChange={(e)=>{
                        const targetvalue = e.target.value
                        const allCategorydetails = allCategory.find(el => el._id == targetvalue)
                        setsubcategoryData((preve)=>{
                            return{
                              ...preve,
                              Category : [...preve.Category,allCategorydetails]
                            }
                        })
                      }}
                      
                    >
                    
                    {
                      allCategory.map((category, index)=>{
                         return(
                          <option key={category._id+"Subcategory"} value={category._id} >{category?.name}</option> 
                         )
                      })
                    } 
                    </select>
                
                </div>


              <button className={` ${subcategoryData.name && subcategoryData.image && subcategoryData.Category[0] ? " hover:bg-primary-200 hover:text-white " : "bg-gray-200 "}px-4 py-1 border w-full my-2 text-primary-200 border-primary-200   `} >Submit</button>

            </form>
       </div>

    </div>
    </section>
)
};

export default UploadSubcategorymodel;
