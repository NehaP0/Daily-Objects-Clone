import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getProducts } from '../Redux/CategoryPage/Action';
import Loading from './Loading';
import { useLocation, useSearchParams } from "react-router-dom";
// import ProductCard from './ProductCard';
import { ProductCard } from './ProductCard';
import CombinedFilter_sort from './SearchPage.jsx/CombinedFilter_sort';
import { Box , Button, Flex, SimpleGrid} from '@chakra-ui/react';


export const ProductList = () => {
    const [prodouctData,setProductData] = useState([])
    const Products=useSelector((store)=>store.ProductReducer.products);
    const dispatch=useDispatch();
    const [searchParams, setSearchParam] = useSearchParams()
    const [filter ,setFilter] = useState(false)
    let isLoading = useSelector((store)=>store.ProductReducer?.isLoading);
    const location = useLocation();
    useEffect(()=>{
      console.log("useeffect is called line 20", Products)
      if (Array.isArray(Products) && Products.length > 0) {
        setProductData(Products);
      } else {
        try {
          const parsed = JSON.parse(localStorage.getItem("categorypage"));
          setProductData(Array.isArray(parsed) ? parsed : []);
        } catch (err) {
          setProductData([]);
        }
      }
    },[Products])
  return (  isLoading ? <Loading /> : 
    <Box>

        <Flex justifyContent={"flex-end"} marginRight={"20px"}>
                <Button onClick={()=>setFilter(prev=>!prev)}>Filter </Button>
              </Flex>
        <Flex direction={{base:"column-reverse",lg:"row"}}>
      <SimpleGrid className='filter-product' w={{base:"100%",lg:filter ? "80%" : "100%"}} transition={"0.5s"} id='product_grid' columns={{ base: 1, md: 2, lg: 4 }} gap={"10px"} padding={"10px"} >
          {prodouctData.length !=0  && prodouctData.map((item, index)=>{
                  return <ProductCard key={item._id || item.id || index} item = {item} />
              })
          }
        </SimpleGrid>
        { filter&&<CombinedFilter_sort filter={filter}/>}
      </Flex>
      
    </Box>
  )
};


