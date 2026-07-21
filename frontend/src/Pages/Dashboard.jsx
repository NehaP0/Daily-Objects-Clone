import React, { useEffect } from 'react'
import {
  Box,Text,Flex,Hide,Show
} from "@chakra-ui/react"
import {RiArrowRightSFill} from "react-icons/ri"
import {useNavigate, useSearchParams} from "react-router-dom"
import DashboardDrawer from '../Components/Dashboard/Drwerresponsive'
import Wishlist from "./Wishlist"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../Redux/UserLogin/userloginaction'
import Myorder from './Myorder'
const Dashboard = () => {
  const dispatch = useDispatch();
  const {token,isAuth,user} = useSelector(store => store.Loginreducer)
  const store = useSelector(store => store.Loginreducer)
  const [Data,setData] = React.useState("");
  const [searchparams,setSearchparams] = useSearchParams();
  const navigate = useNavigate();


  const handleLogout =()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    searchparams.delete("page")
    dispatch(logoutUser);
  }

  const handleRoute = (path)=>{
   navigate(path,{replace:true,state:"/dashboard"});
  }

  const handlesearch = (data)=>{
    setSearchparams({page:data})
  }

  useEffect(()=>{
   console.log("Running useeffect",searchparams.get("page"))
  },[searchparams])
  console.log(user);
  return (
    <Box bg="#fafafa" minH="100vh">
      <Navbar/>
      <Box maxW="1200px" mx="auto" px={4} py={8}>
        <Text fontSize="4xl" fontWeight="800" textAlign="center" mb={8} color="#0f172a" letterSpacing="-0.02em">
          MY ACCOUNT
        </Text>
        <Flex direction={{base:"column", xl:"row"}} gap={8} alignItems="flex-start">
          <Hide below='xl'>
            {token ? (
              <Box 
                w="300px" 
                bg="white" 
                p={6} 
                borderRadius="20px" 
                boxShadow="0 10px 30px -10px rgba(0,0,0,0.06)" 
                border="1px solid #f1f5f9"
              >
                <Flex align="center" gap={3} mb={6} pb={4} borderBottom="1px solid #f1f5f9">
                  <Box bg="#20a87e" color="white" borderRadius="full" w="48px" h="48px" display="flex" alignItems="center" justifyContent="center" fontSize="20px" fontWeight="700">
                    {(Array.isArray(user) && user.length > 0 ? user[0]?.name?.[0] : user?.name?.[0]) || "U"}
                  </Box>
                  <Box>
                    <Text fontSize="sm" fontWeight="700" color="#20a87e" textTransform="uppercase">DAILY ESSENTIAL MEMBER</Text>
                    <Text fontSize="md" fontWeight="700" color="#0f172a">
                      {Array.isArray(user) && user.length > 0 ? user[0]?.name : (user?.name || "User")}
                    </Text>
                    <Text fontSize="xs" color="#64748b">
                      {Array.isArray(user) && user.length > 0 ? user[0]?.email : (user?.email || "")}
                    </Text>
                  </Box>
                </Flex>
                
                <Box display="flex" flexDirection="column" gap={2}>
                  <Flex 
                    onClick={()=>handlesearch("user")} 
                    cursor="pointer" 
                    p={3} 
                    borderRadius="10px" 
                    bg={searchparams.get("page") === "user" ? "#e6f7f2" : "transparent"} 
                    color={searchparams.get("page") === "user" ? "#20a87e" : "#334155"} 
                    fontWeight={searchparams.get("page") === "user" ? "700" : "500"} 
                    justifyContent="space-between" 
                    alignItems="center"
                    _hover={{ bg: "#f8fafc", color: "#20a87e" }}
                    transition="all 0.2s"
                  >
                    Personal Info <RiArrowRightSFill />
                  </Flex>
                  <Flex 
                    onClick={()=>handlesearch("order")} 
                    cursor="pointer" 
                    p={3} 
                    borderRadius="10px" 
                    bg={searchparams.get("page") === "order" ? "#e6f7f2" : "transparent"} 
                    color={searchparams.get("page") === "order" ? "#20a87e" : "#334155"} 
                    fontWeight={searchparams.get("page") === "order" ? "700" : "500"} 
                    justifyContent="space-between" 
                    alignItems="center"
                    _hover={{ bg: "#f8fafc", color: "#20a87e" }}
                    transition="all 0.2s"
                  >
                    My Orders <RiArrowRightSFill />
                  </Flex>
                  <Flex 
                    onClick={()=>handlesearch("wishlist")} 
                    cursor="pointer" 
                    p={3} 
                    borderRadius="10px" 
                    bg={searchparams.get("page") === "wishlist" ? "#e6f7f2" : "transparent"} 
                    color={searchparams.get("page") === "wishlist" ? "#20a87e" : "#334155"} 
                    fontWeight={searchparams.get("page") === "wishlist" ? "700" : "500"} 
                    justifyContent="space-between" 
                    alignItems="center"
                    _hover={{ bg: "#f8fafc", color: "#20a87e" }}
                    transition="all 0.2s"
                  >
                    Wishlist <RiArrowRightSFill />
                  </Flex>
                  <Flex 
                    cursor="pointer" 
                    p={3} 
                    borderRadius="10px" 
                    color="#e11d48" 
                    fontWeight="600" 
                    justifyContent="space-between" 
                    alignItems="center"
                    onClick={()=>handleLogout()}
                    _hover={{ bg: "#ffe4e6" }}
                    transition="all 0.2s"
                  >
                    Logout <RiArrowRightSFill />
                  </Flex>
                </Box>
              </Box>
            ) : (
              <Box 
                w="300px" 
                bg="white" 
                p={6} 
                borderRadius="20px" 
                boxShadow="0 10px 30px -10px rgba(0,0,0,0.06)" 
                border="1px solid #f1f5f9"
              >
                <Text fontSize="lg" fontWeight="700" color="#0f172a" mb={4}>GUEST ACCOUNT</Text>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Flex cursor="pointer" p={3} borderRadius="10px" onClick={()=>handleRoute("/signup")} justifyContent="space-between" alignItems="center" _hover={{ bg: "#f8fafc", color: "#20a87e" }}>Register <RiArrowRightSFill /></Flex>
                  <Flex cursor="pointer" p={3} borderRadius="10px" onClick={()=>handleRoute("/login")} justifyContent="space-between" alignItems="center" _hover={{ bg: "#f8fafc", color: "#20a87e" }}>Login <RiArrowRightSFill /></Flex>
                </Box>
              </Box>
            )}
          </Hide>
          <Hide above='xl'>
            <DashboardDrawer/>
          </Hide>
          <Flex flex="1" bg="white" p={6} borderRadius="20px" boxShadow="0 10px 30px -10px rgba(0,0,0,0.06)" border="1px solid #f1f5f9" minH="500px">
            {
              searchparams.get("page") === "wishlist" ? <Wishlist/> :
              searchparams.get("page") === "order" ? <Myorder/> :
              <Box p={4}>
                <Text fontSize="xl" fontWeight="700" color="#0f172a">Welcome Back!</Text>
                <Text color="#64748b" mt={2}>Select options from the sidebar to view your orders, address book, or saved wishlist items.</Text>
              </Box>
            }
          </Flex>
        </Flex>
      </Box>
      <Footer/>
    </Box>
  )
}

export default Dashboard