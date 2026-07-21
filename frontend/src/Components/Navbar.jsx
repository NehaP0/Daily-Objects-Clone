import {
  Flex,
  Stack,
  HStack,
  VStack,
  useDisclosure,
  IconButton,
  Input,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import { CgShoppingCart } from "react-icons/cg";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useRef, useEffect } from "react";
import HamMenu from "./Drawer";
import HoverCard from "./HoverCard";
import Logo from "../Components/Admin/images/daily_e.png";
import { useSelector, useDispatch } from "react-redux";
import { GetAllCartProductsAction } from "../Redux/CartReducer/action";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((store) => store.Loginreducer);
  const { allcartProducts } = useSelector((store) => store.CartReducer);
  const cartCount = Array.isArray(allcartProducts) ? allcartProducts.length : 0;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    const userID = Array.isArray(user) && user.length > 0 ? user[0]._id : (user?._id || null);
    if (token && userID) {
      dispatch(GetAllCartProductsAction(token, userID));
    }
  }, [token, user, dispatch]);
  const techarr = [
    {
      imgurl:
        "https://images.dailyobjects.com/marche/assets/images/other/phone-cases-s.png?tr=cm-pad_resize,v-2,dpr-1",
      item: [
        { name: "Apple" },
        { name: "Samsung" },
        { name: "Xiaomi" },
        { name: "One Plus" },
      ],
    },
    {
      imgurl:
        "https://images.dailyobjects.com/marche/assets/images/other/laptop-sleeves-and-bags-s.png?tr=cm-pad_resize,v-2,dpr-1",
      item: [
        { name: "Zippered Sleevers" },
        { name: "Macbook hardcase" },
        { name: "Messenger Bags" },
        { name: "Bagpacks" },
      ],
    },
    {
      imgurl:
        "https://images.dailyobjects.com/marche/assets/images/other/chargig-solutions.png?tr=cm-pad_resize,v-2,dpr-1",
      item: [
        { name: "Wireless chargers" },
        { name: "Apple watch chargers" },
        { name: "Cahrgers and cabels" },
        { name: "Charger station" },
      ],
    },
    {
      imgurl:
        "https://images.dailyobjects.com/marche/assets/images/other/watch-accessories-s.png?tr=cm-pad_resize,v-2,dpr-1",
      item: [
        { name: "Apple Watchbands" },
        { name: "Apple Watchbands Chargers" },
        { name: "Universal Watchbands" },
        { name: "Apple Watch Cases" },
      ],
    },
    {
      imgurl:
        "https://images.dailyobjects.com/marche/assets/images/other/stands-s.png?tr=cm-pad_resize,v-2,dpr-1",
      item: [
        { name: "Moblie" },
        { name: "Laptop" },
        { name: "Apple Watch" },
        { name: "i Pad" },
      ],
    },
    {
      imgurl:
        "https://images.dailyobjects.com/marche/assets/images/other/organsiers-s.png?tr=cm-pad_resize,v-2,dpr-1",
      item: [
        { name: "Tech Kit" },
        { name: "Folio" },
        { name: "Pouches" },
        { name: "Cables" },
      ],
    },
    {
      imgurl:
        "https://images.dailyobjects.com/marche/assets/images/other/other-accessories-s.png?tr=cm-pad_resize,v-2,dpr-1",
      item: [
        { name: "Screen Guards" },
        { name: "iPad Cases" },
        { name: "AirPod Cases" },
        { name: "AirTag Cases" },
      ],
    },
  ];

  return (
    <Box
      className="main-navstack glass-header"
      position="sticky"
      top="0"
      zIndex="1000"
      display="flex"
      height={{ base: "65px", md: "75px" }}
      px={{ base: 4, md: 8 }}
      alignItems="center"
      justifyContent="space-between"
      transition="all 0.3s ease"
    >
      <HStack width={{ base: "120px", md: "140px" }}>
        <Link to="/">
          <Image width="100%" src={Logo} alt="Daily Essential Logo" style={{ filter: "brightness(0.95)" }} />
        </Link>
      </HStack>

      <Flex
        display={["none", "none", "none", "flex"]}
        className="nav-menu"
        width="65%"
        justifyContent="space-evenly"
        alignItems="center"
        fontWeight="600"
        fontSize="13px"
        letterSpacing="0.5px"
      >
        <Link to="/products?category=Watch" style={{ textDecoration: "none" }}>
          <Text _hover={{ color: "#20a87e" }} transition="color 0.2s">TECH</Text>
        </Link>
        <Link to="/products?category=Messenger+Bags" style={{ textDecoration: "none" }}>
          <Text _hover={{ color: "#20a87e" }} transition="color 0.2s">BAG & WALLETS</Text>
        </Link>
        <Link to="/products?category=desk" style={{ textDecoration: "none" }}>
          <Text _hover={{ color: "#20a87e" }} transition="color 0.2s">WORK & ESSENTIAL</Text>
        </Link>
        <Link to="/products?category=Pedal+Backpack" style={{ textDecoration: "none" }}>
          <Text _hover={{ color: "#20a87e" }} transition="color 0.2s">GIFTING</Text>
        </Link>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Text _hover={{ color: "#20a87e" }} transition="color 0.2s">COLLECTION</Text>
        </Link>
        <Link to="/products?category=Watch" style={{ textDecoration: "none" }}>
          <Text _hover={{ color: "#20a87e" }} transition="color 0.2s">SHOP BY APPLE</Text>
        </Link>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Text _hover={{ color: "#20a87e" }} transition="color 0.2s">NEW ARRIVALS</Text>
        </Link>
      </Flex>
      <Box
        display={["none", "none", "none", "flex"]}
        alignItems="center"
        gap="6"
      >
        <Link to="/ShoppingBagPage" style={{ position: "relative", display: "inline-flex" }}>
          <CgShoppingCart className="cart-box" size={24} style={{ transition: "transform 0.2s" }} />
          {cartCount > 0 && (
            <Box className="nav-badge">
              {cartCount}
            </Box>
          )}
        </Link>
        <Link to="/dashboard" style={{ display: "inline-flex" }}>
          <FaUserAlt className="cart-box" size={20} style={{ transition: "transform 0.2s" }} />
        </Link>
        <Link to="/SearchPage" style={{ display: "inline-flex" }}>
          <Search2Icon className="cart-box" w={5} h={5} style={{ transition: "transform 0.2s" }} />
        </Link>
      </Box>
      <Box display={["flex", "flex", "flex", "none"]}>
        <HamMenu techarr={techarr} />
      </Box>
    </Box>
  );
};

export default Navbar;
