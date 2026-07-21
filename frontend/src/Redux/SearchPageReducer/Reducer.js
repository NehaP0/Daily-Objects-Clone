import{
    SEARCH_PRODUCT_FAILURE,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS
} from "./ActionType";

const getSafeArray = (key) => {
  try {
    const item = JSON.parse(localStorage.getItem(key));
    return Array.isArray(item) ? item : [];
  } catch {
    return [];
  }
};

const initialState = {
    isLoading : false,
    products : getSafeArray("searchpage"),
    isError : false
}


export const Reducer = (state = initialState,{type,payload})=>{
  switch(type){
    case SEARCH_PRODUCT_REQUEST : return {
        ...state,
        isLoading : true
    }
    case SEARCH_PRODUCT_SUCCESS : return {
        ...state,
        isLoading : false,
        products : payload
    }
    case SEARCH_PRODUCT_FAILURE : return {
        ...state,
        isLoading :false,
        isError : true
    }
    default : return state
  }
}