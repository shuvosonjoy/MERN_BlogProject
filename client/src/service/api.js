import axios from 'axios';
import { API_NOTIFICATION_MESSAGE, SERVICE_URL } from '../constants/config';
import { getAccessToken, getRefreshToken, setAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:5000';


const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers:{
        "Content-Type": "application/json",
    }
});


axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
            
        }

        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
)

const processResponse = (response)=>{
   if(response.status === 200){
       return {
        isSuccess:true,
        data:response.data,
       }
   }
   else{
    return{
        isFailure:true,
        status:response.status,
        msg:response.msg,
        code:response.code,
    }
   }
}

const processError = (error)=>{
    if(error.response){
        return{
            isFailure:true,
          
            msg:API_NOTIFICATION_MESSAGE.responseFailure.message,
            code:error.response.data.code,
        }
    }
    else if(error.request){
        return{
            isFailure:true,
         
            msg:API_NOTIFICATION_MESSAGE.requestFailure.message,
            code:"",
        }
    }
    else{
        return{
            isFailure:true,
         
            msg:API_NOTIFICATION_MESSAGE.networkError.message,
            code:"",
        }
    }
}


const API={

}


for (const [key, value] of Object.entries(SERVICE_URL)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value,body),
         
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };