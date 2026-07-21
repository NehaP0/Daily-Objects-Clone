import { 
  Box, 
  Button, 
  Flex, 
  HStack, 
  VStack, 
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center
} from '@chakra-ui/react';
import styles from '../Styling/checkout.module.css'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState, useRef } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { addAddressAction } from "../Redux/AddressReducer/action";

const Checkout = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { user, token } = useSelector(store => store.Loginreducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const localUser = JSON.parse(localStorage.getItem("user")) || [];
  const localAddress = JSON.parse(localStorage.getItem("userAddress")) || null;
  const orderSummary = JSON.parse(localStorage.getItem("orderSummary")) || {};
  const { totalqty = 0, totaldiscount = 0, grandtotal = 0, priceWODiscount = 0 } = orderSummary;

  const [currentAddress, setCurrentAddress] = useState(
    localAddress ||
    (Array.isArray(user) && user.length > 0 ? user[0]?.address : user?.address) ||
    (Array.isArray(localUser) && localUser.length > 0 ? localUser[0]?.address : localUser?.address) ||
    null
  );

  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [pin, setpin] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [country, setcountry] = useState("");
  const [building, setbuilding] = useState("");
  const [area, setarea] = useState("");
  const [landmark, setlandmark] = useState("");
  const [gstin, setgstin] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" && mobile !== "" && email !== "" && pin !== "" && city !== "" && state !== "" && country !== "" && building !== "" && area !== "") {
      const newAddr = { name, mobile, email, pin, city, state, country, building, area, landmark, gstin };
      localStorage.setItem("userAddress", JSON.stringify(newAddr));
      setCurrentAddress(newAddr);
      const uId = Array.isArray(user) && user.length > 0 ? user[0]._id : (user?._id || null);
      if (uId && token) {
        dispatch(addAddressAction(token, newAddr, uId));
      }
      onClose();
    } else {
      alert("Please fill all required details");
    }
  };

  const HandleContinue = () => {    
    Navigate("/payments");    
  };

  return (
    <Box bg="#fafafa" minH="100vh">
      <Navbar/>
      <Box maxW="1200px" mx="auto" px={4} py={8}>
        {/* Checkout Step Progress Bar */}
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
          <Box h="2px" w="40px" bg="#cbd5e1" />
          <Flex align="center" gap={2} color="#94a3b8" fontWeight="600">
            <Box bg="#e2e8f0" color="#64748b" borderRadius="full" w="24px" h="24px" display="flex" alignItems="center" justifyContent="center" fontSize="12px">3</Box>
            <Text fontSize="sm">Payment</Text>
          </Flex>
        </Flex>

        <Text fontSize="3xl" fontWeight="800" textAlign="center" mb={8} color="#0f172a" letterSpacing="-0.02em">
          CHECKOUT & ADDRESS
        </Text> 

        <Flex direction={{ base: "column", lg: "row" }} gap={8} justify="center" align="flex-start">
          <Box 
            bg="white" 
            p={6} 
            borderRadius="20px" 
            boxShadow="0 10px 30px -10px rgba(0,0,0,0.06)" 
            border="1px solid #f1f5f9"
            flex="1"
            w="100%"
          >
            <Text fontSize="lg" fontWeight="700" color="#0f172a" mb={4} borderBottom="2px solid #20a87e" pb={2} display="inline-block">
              SHIPPING ADDRESS
            </Text>
            {currentAddress ? (
              <Box bg="#f8fafc" p={5} borderRadius="12px" border="1px solid #e2e8f0" mb={6}>
                <Text fontWeight="700" fontSize="md" color="#0f172a">{currentAddress.name}</Text>
                <Text color="#475569" fontSize="sm" mt={1}>
                  {currentAddress.building}{currentAddress.area ? `, ${currentAddress.area}` : ""}
                </Text>
                <Text color="#475569" fontSize="sm">
                  {currentAddress.city}{currentAddress.state ? `, ${currentAddress.state}` : ""} {currentAddress.pin || ""}
                </Text>
                {currentAddress.mobile && (
                  <Text color="#64748b" fontSize="xs" mt={2}>Phone: {currentAddress.mobile}</Text>
                )}
              </Box>
            ) : (
              <Box bg="#f8fafc" p={5} borderRadius="12px" border="1px dashed #cbd5e1" mb={6} textAlign="center">
                <Text color="#64748b" fontSize="sm">No address saved yet. Please add a shipping address below.</Text>
              </Box>
            )}
            <Button 
              ref={btnRef}
              onClick={onOpen}
              colorScheme="teal" 
              variant="outline" 
              borderColor="#20a87e" 
              color="#20a87e" 
              borderRadius="12px"
              _hover={{ bg: "#e6f7f2" }}
              w="100%"
            >
              {currentAddress ? "Edit or Add New Address" : "Add Shipping Address"}
            </Button>
          </Box>

          <Box 
            bg="white" 
            p={6} 
            borderRadius="20px" 
            boxShadow="0 10px 30px -10px rgba(0,0,0,0.06)" 
            border="1px solid #f1f5f9"
            w={{ base: "100%", lg: "400px" }}
          >
            <Text fontSize="lg" fontWeight="700" color="#0f172a" mb={4} borderBottom="2px solid #20a87e" pb={2} display="inline-block">
              ORDER SUMMARY
            </Text>
            <VStack spacing={3} align="stretch" mb={6}>
              <Flex justify="space-between" fontSize="sm" color="#475569">
                <Text>Item Total ({totalqty} Items)</Text>
                <Text fontWeight="600">₹{priceWODiscount}</Text>
              </Flex>
              <Flex justify="space-between" fontSize="sm" color="#20a87e" fontWeight="600">
                <Text>Discount Savings</Text>
                <Text>- ₹{totaldiscount}</Text>
              </Flex>
              <Flex justify="space-between" fontSize="sm" color="#475569">
                <Text>Express Shipping</Text>
                <Text color="#20a87e" fontWeight="700">FREE</Text>
              </Flex>
              <Box h="1px" bg="#e2e8f0" my={2} />
              <Flex justify="space-between" fontSize="md" fontWeight="800" color="#0f172a">
                <Text>Grand Total</Text>
                <Text color="#20a87e">₹{grandtotal}</Text>
              </Flex>
            </VStack>
            <Button 
              bg="#20a87e" 
              color="white" 
              size="lg" 
              w="100%" 
              borderRadius="12px"
              _hover={{ bg: "#1b8e6b", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              onClick={HandleContinue}
            >
              PROCEED TO PAYMENT
            </Button>
          </Box>
        </Flex>
      </Box>

      {/* Address Input Modal */}
      <Modal onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADD / EDIT SHIPPING ADDRESS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={HandleSubmit}>      
              <Input variant='flushed' m={2} placeholder='Full name *' onChange={(e)=>setname(e.target.value)} required />
              <Input variant='flushed' m={2} placeholder='Mobile *' onChange={(e)=>setmobile(e.target.value)} required />
              <Input variant='flushed' m={2} placeholder='Email Address *' onChange={(e)=>setemail(e.target.value)} required />
              <Flex gap={2}>
                <Input variant='flushed' m={2} placeholder='Pincode *' onChange={(e)=>setpin(e.target.value)} required />
                <Input variant='flushed' m={2} placeholder='City *' onChange={(e)=>setcity(e.target.value)} required />
              </Flex>
              <Flex gap={2}>
                <Input variant='flushed' m={2} placeholder='State *' onChange={(e)=>setstate(e.target.value)} required />
                <Input variant='flushed' m={2} placeholder='Country *' onChange={(e)=>setcountry(e.target.value)} required />
              </Flex>
              <Input variant='flushed' m={2} placeholder='Flat No / Building / Street *' onChange={(e)=>setbuilding(e.target.value)} required />
              <Input variant='flushed' m={2} placeholder='Area / Locality *' onChange={(e)=>setarea(e.target.value)} required />
              <Input variant='flushed' m={2} placeholder='Landmark' onChange={(e)=>setlandmark(e.target.value)} />
              <Input variant='flushed' m={2} placeholder='GSTIN' onChange={(e)=>setgstin(e.target.value)} />
              
              <Center mt={4}>
                <ModalFooter>
                  <Button type="submit" colorScheme="teal" bg="#20a87e">SAVE ADDRESS</Button>
                </ModalFooter>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Footer/>
    </Box>
  );
};

export default Checkout