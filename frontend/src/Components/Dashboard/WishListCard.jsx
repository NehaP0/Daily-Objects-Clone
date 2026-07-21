import React from 'react'
import {useNavigate} from "react-router-dom"
import {
    Card,
    Image,
    Stack,
    CardBody,
    Heading,
    Text,
    CardFooter,
    Button,
    Flex
} from "@chakra-ui/react"
import { useDispatch, useSelector } from 'react-redux'
import { deleteWishlistItem, getWishListItems } from '../../Redux/WishlistReducer/action'
const WishListCard = ({product}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token,user} = useSelector(store => store.Loginreducer);
    const handleClick = ()=>{
       navigate(`/products/${product.productId}`)
    }

    const handleDelete = (id)=>{
     const userId = Array.isArray(user) && user.length > 0 ? user[0]._id : (user?._id || null);
     dispatch(deleteWishlistItem(token,id))
     .then(res=> {
       if (userId) dispatch(getWishListItems(token, userId));
     })
    }
  return (
    <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
 
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={product.images[1]}
    alt={product.title}
  />

  <Stack>
    <CardBody>
      <Heading size='sm'>{product.title}</Heading>

      <Flex><Text fontSize={"sm"}>Rs.{product.price}</Text> <Text ml={"10px"} textDecoration={"line-through"} fontSize={"sm"}>{product.discounted_price}</Text></Flex>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue' mr={"30px"}  onClick={()=>handleClick()}>
        Add to Cart
      </Button>
      <Button variant='solid' colorScheme='blue' onClick={()=>handleDelete(product["_id"])}>
        Remove
      </Button>
    </CardFooter>
   </Stack>
  </Card>
  )
}

export default WishListCard