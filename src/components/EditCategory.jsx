import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import uploadimage from "../utils/uploadimage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EditCategory = ({ close, datafetch, data: categorydata }) => {
  const [data, setData] = useState({
    _id: categorydata._id,
    name: categorydata.name,
    image: categorydata.image
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const response = await uploadimage(file);
      const { data: Imageresponse } = response;
      setData((prev) => ({
        ...prev,
        image: Imageresponse.data.url
      }));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.update_category,
        data
      });

      const { data: responsedata } = response;

      if (responsedata.success) {
        toast.success(responsedata.message);
        close();
        datafetch();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-600 z-50 flex items-center justify-center rounded">
      <div className="bg-white max-w-4xl mx-auto w-full rounded">
        <div className="flex items-center justify-between p-2">
          <p className="font-semibold text-2xl">Edit Category</p>
          <div onClick={close} className="cursor-pointer">
            <RxCross2 />
          </div>
        </div>
        <form action="" className="grid p-2" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="flex flex-col gap-2">
            <label id="categoryname" className="font-semibold">Name</label>
            <input
              type="text"
              id="categoryname"
              placeholder="Enter Category name"
              value={data.name}
              onChange={handleOnChange}
              name="name"
              className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded'
            />
          </div>

          <div className='grid gap-1'>
            <p>Image</p>
            <div className='flex gap-4 flex-col lg:flex-row items-center'>
              <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'>
                {
                  data.image ? (
                    <img
                      alt="category"
                      src={data.image}
                      className="h-full w-full object-scale-down"
                    />
                  ) : (
                    <p className='text-sm text-neutral-500'>No Image</p>
                  )
                }
              </div>
              <label htmlFor='uploadCategoryImage'>
                <div className={`px-4 py-2 rounded cursor-pointer border font-medium ${!data.name ? "bg-gray-300" : "border-primary-200 hover:bg-primary-100"}`}>
                  {loading ? (
                    <div>loading..</div>
                  ) : (
                    <div>Upload Image</div>
                  )}
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type='file'
                  id='uploadCategoryImage'
                  className='hidden'
                />
              </label>
            </div>
          </div>

          <div className={`my-9 p-2 text-center cursor-pointer ${data.name && data.image ? 'bg-primary-200' : 'bg-slate-500'}`}>
            <button disabled={!data.name || !data.image}>Update Category</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;
