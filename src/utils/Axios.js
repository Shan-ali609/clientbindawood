import axios from 'axios';
import SummaryApi, { baseURL } from '../common/SummaryApi'; // Import the base URL for your API

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,  // Ensures that cookies are sent with the request
});

 // sending access token in the header
 Axios.interceptors.request.use(
     async(config)=>{
     const accessToken = localStorage.getItem('accesstoken')
     
     if (accessToken) {
         config.headers.Authorization = `Bearer ${accessToken}`
     }
     return config
 },
  (error)=>{
      return Promise.reject(error)
  }
)

// handle access token when it is expire with the help of refrehtoken
Axios.interceptors.request.use(
    (response)=>{ 
        return response
    },
    async (error)=>{   // This is incorrect
        let originRequest = error.config

        if (error.response.status === 401 && originRequest.retry) {
            originRequest.retry = true

            const refreshtoken =  localStorage.getItem('refreshtoken')
            if (refreshtoken) {
                const newAccesstoken =  await refreshAccessToken(refreshtoken)
            }
            if(newAccesstoken){
                originRequest.headers.Authorization = `Bearer ${newAccesstoken}`
                return Axios(originRequest)
            }
        }
        
        return Promise.reject(error)
    }
)

const refreshAccessToken = async(refreshtoken)=>{
    try {
        const response = await Axios({
            ...SummaryApi.refresh_token,
            headers : {
                Authorization : `Bearer ${refreshtoken}`
            }
        })

        const accessToken = response.data.data.accesstoken
        localStorage.setItem('accesstoken',accessToken)
        return accessToken
    } catch (error) {
        console.log(error)
    }
}

export default Axios