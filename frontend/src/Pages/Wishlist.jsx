import React, { useEffect } from 'react'
import WishListCard from '../Components/Dashboard/WishListCard';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishListItems } from '../Redux/WishlistReducer/action';

const Wishlist = () => {
    const {token,user} = useSelector(store => store.Loginreducer);
    const store = useSelector(store => store.wishlistReducer)
    const dispatch = useDispatch();
    const userId = Array.isArray(user) && user.length > 0 ? user[0]._id : (user?._id || null);

    useEffect(()=>{
      if (userId) {
        dispatch(getWishListItems(token, userId))
      }
    },[userId, token, dispatch])

  return (
    <Box>
     {
     store.products.length === 0 ? <Box textAlign={"center"} fontSize={"2xl"}>No products in Wishlist</Box> : store.products.map((item, index)=>{
       return <WishListCard key={item._id || item.id || index} product={item}/>
     })
     }
    </Box>
  )
}

export default Wishlist