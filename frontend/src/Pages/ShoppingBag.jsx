import React, { useEffect, useState } from  'react'
import styles from "../Styling/bag.module.css"

import {
    Box,
    Text,
    Flex,
    VStack,
    HStack,
    IconButton,
    Input,
    Button,
    useDisclosure,   
    Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Icon
  } from '@chakra-ui/react'  
import { FaShoppingBag, FaArrowRight } from "react-icons/fa"

import { useDispatch, useSelector } from 'react-redux'
import { addAddressAction } from "../Redux/AddressReducer/action"
import { useNavigate } from 'react-router-dom'
import { GetAllCartProductsAction, UpdateCartProductAction, deleteCartProductAction } from '../Redux/CartReducer/action'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'



const ShoppingBag = () => {
  
    const dispatch = useDispatch()
    const Navigate = useNavigate()


    const {user,token} = useSelector(store=>store.Loginreducer)

    const userID = Array.isArray(user) && user.length > 0 ? user[0]._id : (user?._id || null);
    const userAddress = Array.isArray(user) && user.length > 0 ? user[0]?.address : (user?.address || null);

    const {allcartProducts} = useSelector(store=>store.CartReducer)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')


    
    const[name, setname] = useState("")
    const[mobile, setmobile] = useState("")
    const[email, setemail] = useState("")
    const[pin, setpin] = useState("")
    const[city, setcity] = useState("")
    const[state, setstate] = useState("")
    const[country, setcountry] = useState("")
    const[building, setbuilding] = useState("")
    const[area, setarea] = useState("")
    const[landmark, setlandmark] = useState("")
    const[gstin, setgstin] = useState("")
    
    const[totalqty, settotalqty] = useState(0)
    const[totaldiscount, settotaldiscount] = useState(0)
    const[grandtotal, setgrandtotal] = useState(0)
    const[priceWODiscount, setpriceWODiscount] = useState(0)


    const HandleCheckout=()=>{
      if(!userAddress){
        onOpen() 
      }
     else{        
        Navigate("/CheckoutPage")
      }
      const orderSummary = {
        totalqty, totaldiscount, grandtotal,priceWODiscount
      }
      localStorage.setItem("orderSummary", JSON.stringify(orderSummary));
    }

    
    
    useEffect(()=>{
      if (userID) {
        dispatch(GetAllCartProductsAction(token,userID))
      }
    },[userID])              

    const HandleQty = (id, val)=>{
            console.log(val)
            dispatch(UpdateCartProductAction(token,val, id))
            .then((res)=>dispatch(GetAllCartProductsAction(token,userID)))
    }

    const HandleDelete = (id)=>{
            dispatch(deleteCartProductAction(token,id))
            .then((res)=>dispatch(GetAllCartProductsAction(token,userID)))

    }

    

      
    useEffect(()=>{
        let Qty=0
        let disc=0
        let grand=0
        let WODiscount = 0
        if (Array.isArray(allcartProducts)) {
            for(let i=0; i<allcartProducts.length; i++){
                const q = Number(allcartProducts[i].quantity) || 1;
                const p = Number(allcartProducts[i].price) || 0;
                const dp = Number(allcartProducts[i].discounted_price) || p;
                Qty += q;
                disc += (dp * q) - (p * q);
                grand += p * q;
                WODiscount += dp * q;
            }
        }
        settotalqty(Qty)
        settotaldiscount(disc)
        setgrandtotal(grand)
        setpriceWODiscount(WODiscount)
    },[allcartProducts])
    
    
       
    const PostIt = (address) =>{
        localStorage.setItem("userAddress", JSON.stringify(address));
        if (userID) {
          dispatch(addAddressAction(token, address, userID))
          .then((res)=>Navigate("/CheckoutPage"))
          .catch((err)=>Navigate("/CheckoutPage"));
        } else {
          Navigate("/CheckoutPage");
        }
    }
  
  
    const HandleSubmit =(e)=>{
        e.preventDefault()
        if(name!=="" && mobile!=="" && email!=="" && pin!=="" && city!=="" && state!==""  && country!=="" && building!=="" && area!==""){
          const address = {name, mobile, email, pin, city, state, country, building, area, landmark, gstin}
          PostIt(address)
        }
        else{
          alert("Please fill all the details")
        }                  
    }     

    const btnRef = React.useRef(null)

    console.log(userID,user)

    

  return (
    <Box bg="#fafafa" minH="100vh">
      <Navbar/>
      <Box maxW="1200px" mx="auto" px={4} py={8}>
        {/* Progress step bar */}
        <Flex justify="center" align="center" gap={4} mb={8}>
          <Flex align="center" gap={2} color="#20a87e" fontWeight="700">
            <Box bg="#20a87e" color="white" borderRadius="full" w="24px" h="24px" display="flex" alignItems="center" justifyContent="center" fontSize="12px">1</Box>
            <Text fontSize="sm">Shopping Bag</Text>
          </Flex>
          <Box h="2px" w="40px" bg="#cbd5e1" />
          <Flex align="center" gap={2} color="#94a3b8" fontWeight="600">
            <Box bg="#e2e8f0" color="#64748b" borderRadius="full" w="24px" h="24px" display="flex" alignItems="center" justifyContent="center" fontSize="12px">2</Box>
            <Text fontSize="sm">Checkout</Text>
          </Flex>
          <Box h="2px" w="40px" bg="#cbd5e1" />
          <Flex align="center" gap={2} color="#94a3b8" fontWeight="600">
            <Box bg="#e2e8f0" color="#64748b" borderRadius="full" w="24px" h="24px" display="flex" alignItems="center" justifyContent="center" fontSize="12px">3</Box>
            <Text fontSize="sm">Payment</Text>
          </Flex>
        </Flex>

        <Text fontSize="3xl" fontWeight="800" textAlign="center" mb={8} color="#0f172a" letterSpacing="-0.02em">
          MY SHOPPING BAG ({totalqty})
        </Text>

        <Flex direction={{ base: "column", lg: "row" }} gap={8} justify="center" align="flex-start">
          {/* Cart Items List */}
          <Box flex="1" w="100%">
            {allcartProducts.length === 0 ? (
              <Center 
                flexDirection="column" 
                py="16" 
                px="6"
                bg="white" 
                borderRadius="24px" 
                border="1px solid #f1f5f9" 
                boxShadow="0 10px 30px -10px rgba(0,0,0,0.06)"
                textAlign="center"
              >
                <Box 
                  bg="#e6f7f2" 
                  w="80px" 
                  h="80px" 
                  borderRadius="full" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  mb={5}
                >
                  <Icon as={FaShoppingBag} w="36px" h="36px" color="#20a87e" />
                </Box>
                <Text fontSize="2xl" fontWeight="800" color="#0f172a" mb={2}>
                  Your Shopping Bag is empty
                </Text>
                <Text color="#64748b" maxW="400px" mb={6} fontSize="sm">
                  Looks like you haven't added anything to your bag yet. Explore our handcrafted collections to find your next essential.
                </Text>

                {/* Quick Category Chips */}
                <HStack spacing={2} mb={8} flexWrap="wrap" justify="center">
                  <Button 
                    size="xs" 
                    borderRadius="full" 
                    bg="#f8fafc" 
                    border="1px solid #e2e8f0" 
                    color="#475569"
                    _hover={{ bg: "#e6f7f2", color: "#20a87e", borderColor: "#20a87e" }}
                    onClick={() => Navigate("/products?category=Watch")}
                  >
                    Watchbands
                  </Button>
                  <Button 
                    size="xs" 
                    borderRadius="full" 
                    bg="#f8fafc" 
                    border="1px solid #e2e8f0" 
                    color="#475569"
                    _hover={{ bg: "#e6f7f2", color: "#20a87e", borderColor: "#20a87e" }}
                    onClick={() => Navigate("/products?category=Messenger+Bags")}
                  >
                    Messenger Bags
                  </Button>
                  <Button 
                    size="xs" 
                    borderRadius="full" 
                    bg="#f8fafc" 
                    border="1px solid #e2e8f0" 
                    color="#475569"
                    _hover={{ bg: "#e6f7f2", color: "#20a87e", borderColor: "#20a87e" }}
                    onClick={() => Navigate("/products?category=desk")}
                  >
                    Desk Essentials
                  </Button>
                  <Button 
                    size="xs" 
                    borderRadius="full" 
                    bg="#f8fafc" 
                    border="1px solid #e2e8f0" 
                    color="#475569"
                    _hover={{ bg: "#e6f7f2", color: "#20a87e", borderColor: "#20a87e" }}
                    onClick={() => Navigate("/products?category=Pedal+Backpack")}
                  >
                    Backpacks
                  </Button>
                </HStack>

                <Button 
                  bg="#20a87e" 
                  color="white" 
                  size="lg" 
                  px={8}
                  borderRadius="14px" 
                  _hover={{ bg: "#1b8e6b", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  rightIcon={<FaArrowRight />}
                  onClick={() => Navigate("/products")}
                >
                  START SHOPPING
                </Button>
              </Center>
            ) : (
              <VStack spacing={4} align="stretch">
                {allcartProducts.map((item, idx) => {
                  const p = Number(item.price) || 0;
                  const dp = Number(item.discounted_price) || p;
                  return (
                    <Flex 
                      key={item._id || item.id || idx}
                      bg="white"
                      p={5}
                      borderRadius="20px"
                      boxShadow="0 10px 25px -10px rgba(0,0,0,0.05)"
                      border="1px solid #f1f5f9"
                      align="center"
                      gap={5}
                      direction={{ base: "column", sm: "row" }}
                    >
                      <Box w={{ base: "100%", sm: "110px" }} h="110px" bg="#f8fafc" borderRadius="12px" overflow="hidden" flexShrink={0}>
                        <img 
                          src={Array.isArray(item.images) ? item.images[0] : item.images} 
                          alt={item.title} 
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>
                      <Box flex="1" w="100%">
                        <Text fontWeight="700" fontSize="md" color="#0f172a" noOfLines={1}>{item.title}</Text>
                        <Flex align="center" gap={3} mt={1}>
                          <Text fontWeight="800" fontSize="md" color="#20a87e">₹{p * item.quantity}</Text>
                          {dp > p && (
                            <Text textDecoration="line-through" color="#94a3b8" fontSize="sm">₹{dp * item.quantity}</Text>
                          )}
                        </Flex>

                        <Flex justify="space-between" align="center" mt={4}>
                          <HStack spacing={1} bg="#f1f5f9" borderRadius="10px" p={1}>
                            <Button 
                              size="xs" 
                              variant="ghost" 
                              isDisabled={item.quantity <= 1} 
                              onClick={() => HandleQty(item._id, item.quantity - 1)}
                              w="28px" h="28px"
                            >-</Button>
                            <Text px={2} fontWeight="700" fontSize="sm">{item.quantity}</Text>
                            <Button 
                              size="xs" 
                              variant="ghost" 
                              onClick={() => HandleQty(item._id, item.quantity + 1)}
                              w="28px" h="28px"
                            >+</Button>
                          </HStack>
                          <IconButton 
                            icon={<img src="https://images.dailyobjects.com/marche/icons/bin.png?tr=cm-pad_resize,v-2,w-20,dpr-1" alt="delete" style={{ width: "18px" }} />}
                            variant="ghost" 
                            size="sm" 
                            onClick={() => HandleDelete(item._id)}
                            aria-label="Remove item"
                            _hover={{ bg: "#ffe4e6" }}
                          />
                        </Flex>
                      </Box>
                    </Flex>
                  );
                })}
              </VStack>
            )}
          </Box>

          {/* Order Summary Sidebar */}
          <Box 
            bg="white" 
            p={6} 
            borderRadius="20px" 
            boxShadow="0 10px 30px -10px rgba(0,0,0,0.06)" 
            border="1px solid #f1f5f9"
            w={{ base: "100%", lg: "380px" }}
          >
            <Text fontSize="lg" fontWeight="800" color="#0f172a" mb={4} borderBottom="2px solid #20a87e" pb={2} display="inline-block">
              ORDER SUMMARY
            </Text>
            <VStack spacing={3} align="stretch" mb={6}>
              <Flex justify="space-between" fontSize="sm" color="#475569">
                <Text>Item Subtotal ({totalqty} Items)</Text>
                <Text fontWeight="600">₹{priceWODiscount}</Text>
              </Flex>
              <Flex justify="space-between" fontSize="sm" color="#20a87e" fontWeight="600">
                <Text>Discount</Text>
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

            <Button 
              ref={btnRef} 
              bg="#20a87e" 
              color="white" 
              size="lg" 
              w="100%" 
              borderRadius="12px"
              _hover={{ bg: "#1b8e6b", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              onClick={HandleCheckout}
              isDisabled={allcartProducts.length === 0}
            >
              PROCEED TO CHECKOUT
            </Button>
          </Box>
        </Flex>
      </Box>

      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADD NEW ADDRESS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={HandleSubmit}>      
              <Input variant = 'flushed' label=''  m = {3} id='first-name' placeholder='Full name *' onChange={(e)=>setname(e.target.value)}/>
              <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='Mobile *'  onChange={(e)=>setmobile(e.target.value)}/>
              <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='Email Address *'  onChange={(e)=>setemail(e.target.value)}/>
              <div display='flex' justifyContent="space-evenly">
                <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='Pincode *'  onChange={(e)=>setpin(e.target.value)}/>
                <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='City *' onChange={(e)=>setcity(e.target.value)} />
                <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='State *'  onChange={(e)=>setstate(e.target.value)}/>
                <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='Country *'  onChange={(e)=>setcountry(e.target.value)}/>
              </div>
              <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='Flat No/Building, Street Name *'  onChange={(e)=>setbuilding(e.target.value)}/>
              <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='Area/Locality *'  onChange={(e)=>setarea(e.target.value)}/>
              <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='Landmark' onChange={(e)=>setlandmark(e.target.value)}/>
              <Input variant = 'flushed' label='' m = {3} id='last-name' placeholder='GSTIN' onChange={(e)=>setgstin(e.target.value)}/>
              
              <p>PS. Your information is safe with us, No spam.</p>

              <Center>
                <ModalFooter>
                  <Button type="submit">ADD ADDRESS</Button>
                </ModalFooter>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Footer/>
    </Box>
  )
}

export default ShoppingBag