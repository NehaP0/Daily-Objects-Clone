import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react'
import {
    Box, 
    Button,
    Flex,
    Input,  
    Center,
    Text,
    VStack,
    HStack,
    Icon
  } from '@chakra-ui/react'  
import { FaLock, FaCreditCard, FaUniversity, FaMoneyBillWave } from "react-icons/fa";

import { UpdatePaymentAction } from "../Redux/PaymentReducer/action"
import { GetAllCartProductsAction, clearCartAction } from "../Redux/CartReducer/action";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
  

function Payments() {
  const orderSummary = JSON.parse(localStorage.getItem("orderSummary")) || {}
  const { totalqty = 0, totaldiscount = 0, grandtotal = 0, priceWODiscount = 0 } = orderSummary

  const { user, token } = useSelector(store => store.Loginreducer)
  const { allcartProducts } = useSelector(store => store.CartReducer)
 
  const [number, setnumber] = useState("")
  const [valid, setvalid] = useState("")
  const [cvv, setcvv] = useState("")
  const [name, setname] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card");

  const dispatch = useDispatch()
  const Navigate = useNavigate(); 
  const toast = useToast()

  const updatePayment = async () => {
    const localUser = JSON.parse(localStorage.getItem("user")) || [];
    const uId = (Array.isArray(user) && user.length > 0 ? user[0]._id : user?._id) || 
                (Array.isArray(localUser) && localUser.length > 0 ? localUser[0]._id : localUser?._id) || 
                null;
    dispatch(clearCartAction(token, uId));
  }

  const HandleSubmit = (e) => {
    e.preventDefault()
    if (paymentMethod === "card" && (number === "" || valid === "" || cvv === "" || name === "")) {
      toast({
        title: 'Please fill in all card details.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Payment Successful!',
        description: 'Thank you for your order.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      updatePayment()  
      setTimeout(() => {
        Navigate("/");
      }, 1000);
    }                
  }

  useEffect(() => {
    const uId = Array.isArray(user) && user.length > 0 ? user[0]._id : (user?._id || null);
    if (uId) {
      dispatch(GetAllCartProductsAction(token, uId))
    }
  }, [user, token, dispatch])

  return (
    <Box bg="#fafafa" minH="100vh">
      <Navbar/>
      <Box maxW="1200px" mx="auto" px={4} py={8}>
        {/* Step Progress Header */}
        <Flex justify="center" align="center" gap={4} mb={8}>
          <Flex align="center" gap={2} color="#20a87e" fontWeight="700">
            <Box bg="#20a87e" color="white" borderRadius="full" w="24px" h="24px" display="flex" alignItems="center" justifyContent="center" fontSize="12px">1</Box>
            <Text fontSize="sm">Bag</Text>
          </Flex>
          <Box h="2px" w="40px" bg="#20a87e" />
          <Flex align="center" gap={2} color="#20a87e" fontWeight="700">
            <Box bg="#20a87e" color="white" borderRadius="full" w="24px" h="24px" display="flex" alignItems="center" justifyContent="center" fontSize="12px">2</Box>
            <Text fontSize="sm">Checkout</Text>
          </Flex>
          <Box h="2px" w="40px" bg="#20a87e" />
          <Flex align="center" gap={2} color="#20a87e" fontWeight="700">
            <Box bg="#20a87e" color="white" borderRadius="full" w="24px" h="24px" display="flex" alignItems="center" justifyContent="center" fontSize="12px">3</Box>
            <Text fontSize="sm">Payment</Text>
          </Flex>
        </Flex>

        <Text fontSize="3xl" fontWeight="800" textAlign="center" mb={8} color="#0f172a" letterSpacing="-0.02em">
          PAYMENT DETAILS
        </Text>

        <Flex direction={{ base: "column", lg: "row" }} gap={8} justify="center" align="flex-start">
          {/* Payment Method Selector & Form */}
          <Box flex="1" w="100%" bg="white" p={6} borderRadius="20px" boxShadow="0 10px 30px -10px rgba(0,0,0,0.06)" border="1px solid #f1f5f9">
            {/* Payment Mode Tabs */}
            <HStack spacing={3} mb={6} pb={4} borderBottom="1px solid #f1f5f9">
              <Button 
                onClick={() => setPaymentMethod("card")}
                leftIcon={<FaCreditCard />}
                size="sm"
                borderRadius="10px"
                bg={paymentMethod === "card" ? "#e6f7f2" : "#f8fafc"}
                color={paymentMethod === "card" ? "#20a87e" : "#64748b"}
                border={paymentMethod === "card" ? "1px solid #20a87e" : "1px solid #e2e8f0"}
                fontWeight="700"
              >
                Card Payment
              </Button>
              <Button 
                onClick={() => setPaymentMethod("cod")}
                leftIcon={<FaMoneyBillWave />}
                size="sm"
                borderRadius="10px"
                bg={paymentMethod === "cod" ? "#e6f7f2" : "#f8fafc"}
                color={paymentMethod === "cod" ? "#20a87e" : "#64748b"}
                border={paymentMethod === "cod" ? "1px solid #20a87e" : "1px solid #e2e8f0"}
                fontWeight="700"
              >
                Cash on Delivery
              </Button>
            </HStack>

            {paymentMethod === "card" && (
              <form onSubmit={HandleSubmit}> 
                <Text fontSize="md" fontWeight="700" color="#0f172a" mb={4}>
                  Enter Card Details
                </Text>
                
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="#475569" mb={1}>CARD NUMBER *</Text>
                    <Input 
                      variant='outline' 
                      type="number" 
                      placeholder='1234 5678 9101 1121' 
                      borderRadius="10px" 
                      borderColor="#cbd5e1"
                      focusBorderColor="#20a87e"
                      onChange={(e)=>setnumber(e.target.value)} 
                      required
                    />
                  </Box>

                  <Flex gap={4}>
                    <Box flex="1">
                      <Text fontSize="xs" fontWeight="700" color="#475569" mb={1}>VALID THRU (MM/YY) *</Text>
                      <Input 
                        variant='outline' 
                        placeholder='MM / YY' 
                        borderRadius="10px" 
                        borderColor="#cbd5e1"
                        focusBorderColor="#20a87e"
                        onChange={(e)=>setvalid(e.target.value)} 
                        required
                      />
                    </Box>
                    <Box flex="1">
                      <Text fontSize="xs" fontWeight="700" color="#475569" mb={1}>CVV *</Text>
                      <Input 
                        variant='outline' 
                        type="password" 
                        maxLength={4}
                        placeholder='123' 
                        borderRadius="10px" 
                        borderColor="#cbd5e1"
                        focusBorderColor="#20a87e"
                        onChange={(e)=>setcvv(e.target.value)} 
                        required
                      />
                    </Box>
                  </Flex>

                  <Box>
                    <Text fontSize="xs" fontWeight="700" color="#475569" mb={1}>NAME ON CARD *</Text>
                    <Input 
                      variant='outline' 
                      placeholder='Full name as printed on card' 
                      borderRadius="10px" 
                      borderColor="#cbd5e1"
                      focusBorderColor="#20a87e"
                      onChange={(e)=>setname(e.target.value)} 
                      required
                    />
                  </Box>
                </VStack>

                <HStack spacing={2} justify="center" mt={5} color="#64748b" fontSize="xs">
                  <Icon as={FaLock} color="#20a87e" />
                  <Text>128-Bit SSL Encrypted Payment. Your card info is safe.</Text>
                </HStack>

                <Button 
                  type="submit" 
                  bg="#20a87e" 
                  color="white" 
                  size="lg" 
                  w="100%" 
                  mt={6}
                  borderRadius="12px"
                  _hover={{ bg: "#1b8e6b", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  PAY NOW ₹{grandtotal}
                </Button>
              </form>
            )}

            {paymentMethod === "cod" && (
              <Box py={6} textAlign="center">
                <Text fontSize="md" fontWeight="700" color="#0f172a" mb={2}>Cash on Delivery</Text>
                <Text fontSize="sm" color="#64748b" mb={6}>Pay with cash when your package is delivered to your doorstep.</Text>
                <Button bg="#20a87e" color="white" size="lg" w="100%" borderRadius="12px" onClick={HandleSubmit}>
                  PLACE ORDER WITH COD
                </Button>
              </Box>
            )}
          </Box>

          {/* Order Summary Sidebar */}
          <Box bg="white" p={6} borderRadius="20px" boxShadow="0 10px 30px -10px rgba(0,0,0,0.06)" border="1px solid #f1f5f9" w={{ base: "100%", lg: "380px" }}>
            <Text fontSize="lg" fontWeight="800" color="#0f172a" mb={4} borderBottom="2px solid #20a87e" pb={2} display="inline-block">
              ORDER SUMMARY
            </Text>
            <VStack spacing={3} align="stretch" mb={6}>
              <Flex justify="space-between" fontSize="sm" color="#475569">
                <Text>Item Subtotal ({totalqty} Items)</Text>
                <Text fontWeight="600">₹{priceWODiscount}</Text>
              </Flex>
              <Flex justify="space-between" fontSize="sm" color="#20a87e" fontWeight="600">
                <Text>Discount Savings</Text>
                <Text>- ₹{totaldiscount}</Text>
              </Flex>
              <Flex justify="space-between" fontSize="sm" color="#475569">
                <Text>Shipping</Text>
                <Text color="#20a87e" fontWeight="700">FREE</Text>
              </Flex>
              <Box h="1px" bg="#e2e8f0" my={2} />
              <Flex justify="space-between" fontSize="md" fontWeight="800" color="#0f172a">
                <Text>Grand Total</Text>
                <Text color="#20a87e">₹{grandtotal}</Text>
              </Flex>
              {totaldiscount > 0 && (
                <Text fontSize="xs" fontWeight="700" color="#20a87e" textAlign="right">
                  Total Savings: ₹{totaldiscount}
                </Text>
              )}
            </VStack>
          </Box>
        </Flex>
      </Box>
      <Footer/>
    </Box>
  )
}

export default Payments