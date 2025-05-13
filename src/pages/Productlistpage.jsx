import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
// import Loading from '../components/Loading'
// import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import Cardproduct from './Cardproduct'

const Productlistpage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])
  const categoryId = params.Category?.split("-").slice(-1)[0]
  const subcategoryId = params.subcategory?.split("-").slice(-1)[0]
  const subcategorySlug = params.subcategory?.split("-").slice(0, -1).join("-")
  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.categorySubCategorywise_product,
        data: {
          category : categoryId,
          subCategory : subcategoryId,
          page : page ,
          limit: 10,
        },
      })

      const { data: responseData } = response
        console.log('responseData.data', responseData.data);
  
      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data)
        } else {
          setData(prev => [...prev, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  console.log('DisplaySubCatory', DisplaySubCatory)

  useEffect(() => {
    fetchProductdata()
  }, [params])

  useEffect(() => {
    if (!categoryId) return;

    const filtered = AllSubCategory.filter(sub =>
      Array.isArray(sub.category)
        ? sub.Category.some(cat => cat._id === categoryId)
        : sub.Category === categoryId // for single ID format
    );

    setDisplaySubCategory(filtered);
  }, [categoryId, AllSubCategory]);

  console.log('AllSubCategory', AllSubCategory)
  return (
    <section className=''>
      <div className='container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        {/* Sidebar Subcategory */}
        <div className='min-h-[88vh] max-h-[88vh] overflow-y-auto grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
          {DisplaySubCatory.map((s, index) => {
            // const link = `/${s?.category[0]?.name}-${s?.category[0]?._id}/${s.name}-${s._id}`
            return (
              // <Link
              //   key={s._id}
              //   to={link}
              //   className={`w-full p-2 lg:flex items-center lg:gap-4 border-b hover:bg-green-100 cursor-pointer
              //     ${subcategoryId === s._id ? 'bg-green-100' : ''}`}
              // >
              <div> 
                <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded'>
                  <img
                    src={s.image}
                    alt='subCategory'
                    className='w-14 h-14 object-scale-down'
                  />
                </div>
                <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>
                  {s.name}
                </p>
                </div>
              // </Link>
            )
          })}
        </div>

        {/* Product Listing */}
        <div className=''>
          <div className='bg-white shadow-md p-4 sticky top-20 z-10'>
            <h3 className='font-semibold capitalize'>{subcategorySlug || 'Products'}</h3>
          </div>

          <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
              {data.map((p, index) => (
                <Cardproduct
                  key={p._id + 'productSubCategory' + index}
                  data={p}
                />
              ))}
            </div>

            {/* {loading && <Loading />} */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Productlistpage
