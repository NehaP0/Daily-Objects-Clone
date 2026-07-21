import axios from "axios"
import { BASE_URL } from "../../apiConfig"
import * as types from "./usersignupactiontype"
const usersignupaction = (params) =>(dispatch) => {
    dispatch({type:types.POSTDATAREQUEST})
    return axios.post(`${BASE_URL}/user/register`,params)
    .then(r=>dispatch({type:types.POSTDATASUCCESS,payload:r.data}))
    .catch(e=>dispatch({type:types.POSTDATAFAILURE}))
}

export default usersignupaction
