import Axios from './Axios'
import SummaryApi from '../common/SummaryApi'

const fetchUser = async()=>{
   try {
    const response = await Axios({
        ...SummaryApi.user_detail
    })
    return response.data
   } catch (error) {
     console.log(error);
     
   }
}
export default fetchUser