import React from 'react';
import { AiOutlineHeart } from "react-icons/ai";
import {
    Flex,
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    useToast,
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addToWishlist} from "../Redux/WishlistReducer/action"
// import "../Pages/Styles/ProductCardCss"
  
  export const ProductCard=({item})=> {
    const {isAuth,token} = useSelector(store => store.Loginreducer)
    const Navigate = useNavigate();
    const dispatch = useDispatch();  
    const toast = useToast()

    const price = Number(item.price) || 0;
    const discountedPrice = Number(item.discounted_price) || price;
    const discountPercent = discountedPrice > price ? Math.round(((discountedPrice - price) / discountedPrice) * 100) : 0;
    
    const handleAddToWishlist = (item) => {
      let obj = {...item}
      obj["productId"] = item["_id"];
      delete obj["_id"];
      if(token){
       dispatch(addToWishlist(token,obj,toast))
      }else{
        Navigate("/login",{replace:true,state:"/categorypage"})
      }
    }

    const handleclick = () => {
      const pId = item._id || item.id;
      if (pId) {
        Navigate(`/products/${pId}`);
      }
    }
    return (
      <Center py={2}>
        <Box 
          onClick={handleclick}
          role={'group'}
          cursor="pointer"
          w={'full'}
          maxW={'320px'}
          bg={'#ffffff'}
          borderRadius={'16px'}
          overflow={'hidden'}
          boxShadow={'0 10px 25px -10px rgba(0,0,0,0.06)'}
          border={'1px solid #f1f5f9'}
          transition={'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'}
          _hover={{
            transform: 'translateY(-6px)',
            boxShadow: '0 20px 35px -10px rgba(32, 168, 126, 0.15)',
            borderColor: 'rgba(32, 168, 126, 0.3)',
          }}
          pos={'relative'}
          zIndex={1}>
          <Box
            pos={'relative'}
            height={'260px'}
            bg={'#f8fafc'}
            overflow={'hidden'}
          >
            <Flex
              pos={'absolute'}
              top={'12px'}
              left={'12px'}
              right={'12px'}
              justifyContent={'space-between'}
              alignItems={'center'}
              zIndex={2}
            >
              {discountPercent > 0 ? (
                <Box
                  bg={'#20a87e'}
                  color={'white'}
                  fontSize={'11px'}
                  fontWeight={'700'}
                  px={'10px'}
                  py={'4px'}
                  borderRadius={'999px'}
                  letterSpacing={'0.5px'}
                >
                  {discountPercent}% OFF
                </Box>
              ) : <Box></Box>}
              <Box
                bg={'rgba(255,255,255,0.9)'}
                p={'8px'}
                borderRadius={'full'}
                boxShadow={'0 2px 8px rgba(0,0,0,0.08)'}
                transition={'transform 0.2s'}
                _hover={{ transform: 'scale(1.15)', bg: '#ffffff' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(item);
                }}
              >
                <AiOutlineHeart color={'#0f172a'} size={"20px"} />
              </Box>
            </Flex>

            <Image
              height={'100%'}
              width={"100%"}
              objectFit={'cover'}
              src={Array.isArray(item.images) ? item.images[0] : item.images}
              alt={item.title}
              transition={'transform 0.5s ease'}
              _groupHover={{
                transform: 'scale(1.08)',
              }}
            />
          </Box>
          <Stack p={4} align={'flex-start'} spacing={2}>
            <Text 
              fontSize={'sm'} 
              fontWeight={600} 
              color={'#0f172a'}
              noOfLines={1}
              textAlign={'left'}
              w={'100%'}
            >
              {item.title}
            </Text>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Text fontWeight={700} fontSize={'lg'} color={'#20a87e'}>
                ₹{price}
              </Text>
              {discountedPrice > price && (
                <Text textDecoration={'line-through'} color={'#94a3b8'} fontSize={'sm'}>
                  ₹{discountedPrice}
                </Text>
              )}
            </Stack>
            {item.offer && (
              <Text fontSize={"xs"} fontWeight={600} color={"#e11d48"}>
                {item.offer}
              </Text>
            )}
          </Stack>
        </Box>
      </Center>
    );
  }
