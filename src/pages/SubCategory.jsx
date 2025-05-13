import React, { useState, useEffect } from 'react'
import UploadSubcategorymodel from '../components/UploadSubcategorymodel'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Viewimage from '../components/Viewimage'
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { AiOutlineDelete } from "react-icons/ai";
import EditSubcategory from '../components/EditSubcategory'
import Confirmbox from '../components/Confirmbox'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setallSubCategory } from '../store/productslice'

const SubCategory = () => {
  const [addsubcategory, setaddsubcategory] = useState(false)
  const [subCategorydata, setsubCategorydata] = useState([])
  const [loading, setloading] = useState(false)
  const [imageurl , setimageurl] = useState("")
  const [openedit , setopenedit] = useState(false)
  const [editsubCategorydata , seteditsubCategorydata] = useState({
    _id : ""
  })
   const [deleteConfirmbox, setdeleteConfirmbox] = useState(false);
   const [deletesubCategory, setdeletesubCategory] = useState({
    _id: "",
  });

  const dispatch = useDispatch()
  const handleuploadsubcategory = () => {
    setaddsubcategory(true)
  }

  const fetchSubCategory = async () => {
    try {
      setloading(true)
      const response = await Axios({
        ...SummaryApi.get_subcategory
      })
      const { data: responsedata } = response
      if (responsedata.success) {
        setsubCategorydata(responsedata.data)
        dispatch(setallSubCategory(responsedata.data))

      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setloading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const handleDeletesubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.delete_subcategory,
        data: deletesubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setdeleteConfirmbox(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // console.log("Sub Category Data", subCategorydata);

  return (
    <section className="h-full p-4">
      {/* Header Section */}
      <div className="bg-white p-4 shadow-lg flex items-center justify-between">
        <div className="text-[23px] font-semibold">Sub Category</div>
        <div
          onClick={handleuploadsubcategory}
          className="border-blue-900 border-2 rounded relative overflow-hidden group cursor-pointer"
        >
          <button className="py-2 px-4 rounded bg-transparent relative z-10 hover:text-white">
            Add SubCategory
          </button>
          <div className="absolute top-0 left-0 w-full h-full bg-blue-900  transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-in-out"></div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 overflow-x-auto">
        {loading ? (
          <p className="text-center font-semibold text-gray-600">Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 w-[5%] text-left">No</th>
                <th className="border border-gray-300 px-4 py-2 w-[25%] text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 w-[20%] text-left">Image</th>
                <th className="border border-gray-300 px-4 py-2 w-[35%] text-left">Category</th>
                <th className="border border-gray-300 px-4 py-2 w-[15%] text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {subCategorydata.length > 0 ? (
                subCategorydata.map((subcategory, index) => (
                  <tr key={subcategory._id} className="hover:bg-gray-100">
                    {/* SR No Column */}
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>

                    {/* Subcategory Column */}
                    <td className="border border-gray-300 px-4 py-2">{subcategory.name}</td>

                    {/* Image Column */}
                    <td className="border cursor-pointer border-gray-300 px-4 py-2">
                      <img
                        src={subcategory.image}
                        alt={subcategory.name}
                        className="h-12 w-12 object-cover rounded-md"
                        onClick={()=>{
                          setimageurl(subcategory.image)
                        }}

                      />
                    </td>
                   
                    {/* Category Column */}
                    <td className="border border-gray-300 px-4 py-2">
                      { subcategory.Category.map((cat) => cat.name).join(', ')}
                    </td>
                    <td className="border border-gray-300 px-4 py-2"> 
                      <div className='flex gap-2 items-end justify-end'>
                       <div onClick={()=>{setopenedit(true),seteditsubCategorydata(subcategory)}} className='bg-primary-100 hover:bg-primary-200 p-2 rounded-full cursor-pointer '><HiOutlinePencilSquare className='h-6 w-6' /></div>
                       <div onClick={()=>{setdeletesubCategory(subcategory),setdeleteConfirmbox(true);}} className='bg-red-400 hover:bg-red-500 p-2 rounded-full cursor-pointer'><AiOutlineDelete className='h-6 w-6' /></div>
                      </div> 
                      </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No subcategories found
                  </td>
                </tr>
              )}
            
            </tbody>
          </table>
        )}
      </div>

      {/* Upload Subcategory Modal */}
      {addsubcategory && <UploadSubcategorymodel close={() => setaddsubcategory(false)} fetchdata={fetchSubCategory} />}
        {imageurl && <Viewimage url={imageurl} close={()=>{setimageurl("")}} /> }
          {openedit && <EditSubcategory data={editsubCategorydata} close={()=>{setopenedit(false)}} fetchdata={fetchSubCategory} />}
          {deleteConfirmbox && (
        <Confirmbox
          confirm={handleDeletesubCategory}
          close={() => setdeleteConfirmbox(false)}
        />
      )}
    </section>
  )
}

export default SubCategory
