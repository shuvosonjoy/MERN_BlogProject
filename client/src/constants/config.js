export const API_NOTIFICATION_MESSAGE = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded",
  },
  success: {
    title: "Success",
    message: "Data has been loaded successfully",
  },
  requestFailure: {
    title: "Error!",
    message: "An error occur while parsing request data"
},
responseFailure: {
    title: "Error!",
    message: "An error occur while fetching response from server. Please try again"
},
networkError: {
    title: "Error!",
    message: "Unable to connect to the server. Please check internet connectivity and try again."
},
};


export const SERVICE_URL ={
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:'POST'},
}