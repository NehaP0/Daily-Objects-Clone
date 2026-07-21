import { GETUSERFALIURE,GETUSERPENDING, GETUSERSUCCESS } from "./actiontype"
import axios from "axios"
import { BASE_URL } from "../../apiConfig"

  export const getuserAction = (token,userId)=>(dispatch)=>{
    console.log("getuserAction called");
    dispatch({type: GETUSERPENDING})
    const headers = {
      Authorization: `${token}`
    };
    return axios({
      method: 'GET',
      url: `${BASE_URL}/user/`,
      data: {userId},
      headers: headers
    })
    .then((res)=>{
      dispatch({type: GETUSERSUCCESS ,payload:res.data})
      console.log(res);
    })
    .catch((err)=>{
      dispatch({type: GETUSERFALIURE})
      console.log(err);
    })
  }
   
  


