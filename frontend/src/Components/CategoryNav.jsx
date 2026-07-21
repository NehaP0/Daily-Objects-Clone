// import React from 'react'
import { useLocation, useSearchParams } from "react-router-dom";
import "./CategoryNav.css"

import React, { useEffect, useState } from 'react';
import { filterProduct } from "../Redux/CategoryPage/Action";
import {useDispatch, useSelector} from "react-redux";
import { getProducts } from '../Redux/CategoryPage/Action';
import { Box, Heading } from "@chakra-ui/react";

export const CategoryNav = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const initialCategory = searchParams.get("category") || ""
  const [category, setcategory] = useState(initialCategory)
  const location = useLocation()
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setcategory(value);
    if (value) {
      setSearchParam({ category: value });
    } else {
      setSearchParam({});
    }
  };

  useEffect(() => {
    const catFromUrl = searchParams.get("category") || "";
    setcategory(catFromUrl);
  }, [location.search]);

  useEffect(() => {
    let params = {}
    if (searchParams.getAll("color").length !== 0) {
      params["color"] = searchParams.getAll("color")
    }
    if (searchParams.get("sort") !== null) {
      params["sort"] = searchParams.get("sort")
    }
    if (searchParams.get("price_gt") !== null && searchParams.get("price_lt") !== null) {
      params["price_gt"] = searchParams.get("price_gt")
      params["price_lt"] = searchParams.get("price_lt")
    }
    const currentCategory = searchParams.get("category");
    if (currentCategory && currentCategory !== "") {
      params["category"] = currentCategory
    }
    dispatch(getProducts(params))
  }, [location.search, dispatch])

  return (
    <div>
      <img className="category-banner" src="https://images.dailyobjects.com/marche/assets/images/other/offer-baners-updated-homepage-desktop.jpg?tr=cm-pad_crop,v-2,dpr-1" alt="Special Offers Banner" />
     
      <div className='category-main'>
        <div className={`category-item ${category === "" ? "active" : ""}`} onClick={()=> handleChange("")}>
          <img src="https://images.dailyobjects.com/marche/icons/new-arrival/all.png?tr=cm-pad_resize,v-2,w-71,h-70,dpr-1" alt="All Products" />
          <h3>ALL</h3>
        </div> 

        <div className={`category-item ${category === "Watch" ? "active" : ""}`} onClick={()=> handleChange("Watch")}>
          <img src="https://images.dailyobjects.com/marche/icons/category/apple-watchband-desktop-icon.jpg?tr=cm-pad_crop,v-2,w-160,h-160,dpr-1" alt="Watchbands" />
          <h3>WATCHBANDS</h3>
        </div>

        <div className={`category-item ${category === "Messenger Bags" ? "active" : ""}`} onClick={()=> handleChange("Messenger Bags")}>
          <img src="https://images.dailyobjects.com/marche/product-images/1202/terracotta-red-bask-messenger-bag-images/Terracotta-Red-Coach-Messenger-Bag-2n.png?tr=cm-pad_resize,v-2,w-352,h-434,dpr-1" alt="Messenger Bags" />
          <h3>MESSENGER BAGS</h3>
        </div>

        <div className={`category-item ${category === "Pedal Backpack" ? "active" : ""}`} onClick={()=> handleChange("Pedal Backpack")}>
          <img src="https://images.dailyobjects.com/marche/product-images/1201/all-blue-pedal-daypack-images/All-Blue-Pedal-Daypack-vw.png?tr=cm-pad_resize,v-2,w-768,h-636,dpr-1" alt="Pedal Backpack" />
          <h3>PEDAL BACKPACK</h3>
        </div>

        <div className={`category-item ${category === "desk" ? "active" : ""}`} onClick={()=> handleChange("desk")}>
          <img src="https://images.dailyobjects.com/marche/product-images/1702/desk-trio-bundle-limited-edition-images/Desk-Trio-Bundle.png?tr=cm-pad_resize,v-2,w-768,h-636,dpr-1" alt="Desks" />
          <h3>DESKS</h3>
        </div>
      </div>
    </div> 
  )

}


