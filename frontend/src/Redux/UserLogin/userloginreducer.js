
import * as types from "./userloginactiontype"

const getSafeStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch {
    return fallback;
  }
};

const savedToken = getSafeStorage("token", null);

const initlogin = {
    isError: false,
    isloading: false,
    isAuth: !!savedToken,
    token: savedToken,
    user: getSafeStorage("user", [])
}
export const Loginreducer = (state = initlogin,action)=>{
     
    switch(action.type){
         case types.GETLOGINDATAREQUEST:{
            return{
                ...state,
                isError:false,
                isloading:true,
            }
         }
         case types.GETLOGINDATASUCCESS:{
            return{
                ...state,
                isError:false,
                isloading:false,
                isAuth:true,
                token:action.payload.token,
                user:action.payload.user
            }
         }
         case types.GETLOGINDATAFALIURE:{
            return{
                ...state,
                isError:true,
                isloading:false,      
            }
        }
        case types.LOGOUTUSER:{
            return{
                ...state,
                token:null,
                isAuth:false
            }
        }
          default: return state
    }
   
}