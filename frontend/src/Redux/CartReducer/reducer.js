
import{
    CART_FAILURE,
    CART_REQUEST,
    GET_SINGLE_PRODUCT_SUCCESS,
    ADD_CART_SUCCESS,
    GET_CART_PRODUCTS_SUCCESS,
    DELETE_CART_PRODUCT_SUCCESS,
    UPDATE_CART_PRODUCT_SUCCESS
} from "./actionTypes" 

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
    products : getSafeArray("Cart"),
    singleProduct : getSafeArray("singleproduct"),
    allcartProducts:[],
    isError : false
}

export const reducer = (state = initialState,{type,payload})=>{
  switch(type){
    case CART_REQUEST : return {
        ...state,
        isLoading : true
    }
    case GET_SINGLE_PRODUCT_SUCCESS : return {
        ...state,
        singleProduct : [payload],
        isLoading : false,
    }    
    case ADD_CART_SUCCESS : return {
        ...state,
        isLoading : false,
        products : [...state.products, payload],
        allcartProducts : payload ? [...state.allcartProducts, payload] : state.allcartProducts
    }
    
    case GET_CART_PRODUCTS_SUCCESS : return {...state, isLoading :false,isError : false, allcartProducts: payload}
    case DELETE_CART_PRODUCT_SUCCESS : return {...state, isLoading:false, isError:false}
    case UPDATE_CART_PRODUCT_SUCCESS: return {...state, isLoading: false, allcartProducts: state.data.map((item) => item.id === payload.id ? payload : item)};
    
    case CART_FAILURE : return {
      ...state,
      isLoading :false,
      isError : true
  }
    default : return state
  }
}