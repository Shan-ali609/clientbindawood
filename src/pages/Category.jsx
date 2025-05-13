import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import Nodata from "../components/Nodata";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import EditCategory from "../components/EditCategory";
import Confirmbox from "../components/Confirmbox";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setallCategory } from "../store/productslice";
// import { useSelector } from "react-redux";

const Category = () => {
  const [uploadcategory, setuploadcategory] = useState(false);
  const [loading, setloading] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [editCategory, seteditCategory] = useState(false);
  const [editcategorydata, seteditcategorydata] = useState({
    name: "",
    image: "",
  });
  const [deleteConfirmbox, setdeleteConfirmbox] = useState(false);
  const [deleteCategory, setdeleteCategory] = useState({
    _id: "",
  });
  const dispatch = useDispatch();
  const handleuploadcategory = () => {
    setuploadcategory(true);
  };

  const fetchdata = async () => {
    try {
      setloading(true);
      const response = await Axios({
        ...SummaryApi.get_category,
      });

      const { data: responseData } = response;
      // console.log("data", responseData.data);

      if (responseData.success) {
        setcategoryData(responseData.data);
        dispatch(setallCategory(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.delete_category,
        data: deleteCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchdata();
        setdeleteConfirmbox(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full h-full">
      <div className="bg-white w-full p-2 shadow-lg flex items-center justify-between">
        <div className="text-2xl font-semibold">Category</div>
        <div
          onClick={handleuploadcategory}
          className="border-blue-900 border-2 rounded relative overflow-hidden group"
        >
          <button className="py-1 lg:py-3 px-2 lg:px-4 rounded bg-transparent relative z-10">
            Add Category
          </button>
          <div className="absolute top-0 left-0 w-full h-full bg-blue-900 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-in-out"></div>
        </div>
      </div>
      <div className="flex items-center content-center mx-auto">
        {!categoryData.length === 0 && !loading && <Nodata />}
        {loading && <Loading />}{" "}
      </div>
      <div className="p-5 w-full grid   grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData.map((category, index) => {
          return (
            <div
              className="w-32 h-36  mb-32 rounded shadow-md mx-auto"
              key={category._id}
            >
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    seteditCategory(true);
                    seteditcategorydata(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-300 text-green-400 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setdeleteConfirmbox(true);
                    setdeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-300 text-red-400 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {editCategory && (
        <div>
          <EditCategory
            datafetch={fetchdata}
            data={editcategorydata}
            close={() => seteditCategory(false)}
          />
        </div>
      )}
      {uploadcategory && (
        <div>
          <UploadCategoryModel
            datafetch={fetchdata}
            close={() => setuploadcategory(false)}
          />
        </div>
      )}

      {deleteConfirmbox && (
        <Confirmbox
          confirm={handleDeleteCategory}
          close={() => setdeleteConfirmbox(false)}
        />
      )}
    </section>
  );
};

export default Category;
