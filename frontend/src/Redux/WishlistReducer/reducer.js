
import {
    WISHLIST_REQUEST,
    WISHLIST_FAILURE,
    ADD_WISHLIST_SUCCESS,
    GET_WISHLIST_SUCCESS
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
    products : getSafeArray("Wishlist"),
    isError : false
}

export const Reducer = (state = initialState,{type,payload})=>{
  switch(type){
    case WISHLIST_REQUEST : return {
        ...state,
        isLoading : true
    }
    case ADD_WISHLIST_SUCCESS : return {
        ...state,
        isLoading : false,
    }
    case WISHLIST_FAILURE : return {
        ...state,
        isLoading :false,
        isError : true
    }
    case GET_WISHLIST_SUCCESS : return {
        ...state,
        isLoading : false,
        products : payload
    }
    default : return state
  }
}