import axios from "axios"
import { BASE_URL } from "../../apiConfig"

import * as types from "./userloginactiontype"

  export const getlogindata = (data)=>(dispatch)=>{

    dispatch({type:types.GETLOGINDATAREQUEST})

    return axios.post(`${BASE_URL}/user/login`,data)
    .then(r=>dispatch({type:types.GETLOGINDATASUCCESS,payload:r.data}))
    .catch(e=>dispatch({type:types.GETLOGINDATAFALIURE}))
    }
   

    
    export const logoutUser = (dispatch)=>{
      localStorage.removeItem("token");
      dispatch({type:types.LOGOUTUSER})
    }

