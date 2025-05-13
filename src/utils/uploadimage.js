import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'


const uploadimage = async(image)=>{
   try {
      const formdata  = new FormData()
      formdata.append('image',image)
    const response = await Axios({
        ...SummaryApi.uploadimage,
        data : formdata
    })
    return response
   } catch (error) {
    return error
   }
}

export default uploadimage