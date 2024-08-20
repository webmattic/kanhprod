"use client";

import React, { useEffect, useState } from "react";
import { Suspense, lazy } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import SliderOne from "@/components/Slider/SliderOne";
import WhatNewOne from "@/components/Home1/WhatNewOne";
import productData from "@/data/Product.json";
import Collection from "@/components/Home1/Collection";
import TabFeatures from "@/components/Home1/TabFeatures";
import Banner from "@/components/Home1/Banner";
import Benefit from "@/components/Home1/Benefit";
import testimonialData from "@/data/Testimonial.json";
import Testimonial from "@/components/Home1/Testimonial";
import Instagram from "@/components/Home1/Instagram";
import Brand from "@/components/Home1/Brand";
import Footer from "@/components/Footer/Footer";
import ModalNewsletter from "@/components/Modal/ModalNewsletter";


const Loading = () => <div>Loading...</div>;
export default function Home() {
  // const [productData, setProductData] = useState([]);

  // const getProducts = async () => {
  //   try { 
  //     const response = await fetch("/api/getProducts");
  //     const data = await response.json();
  //     setProductData(data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error); 
  //   }
  // };
  // useEffect(() => {
  //   getProducts();
  // }, []);

  type Product = {
    _id: string;
    name: string;
    brand: string;
    sold: number;
    quantity: number;
    quantityPurchase: number;
    sizes: string;
    variation: string;
    thumbImage: string;
    images: string;
    description: string;
    action: string;
    slug: string;
  };


  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Suspense fallback={<Loading />}>
          <SliderOne />
        </Suspense>
      </div>
      <Suspense fallback={<Loading />}>
        <WhatNewOne data={productData}  start={0} limit={4} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Collection />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <TabFeatures data={productData} start={0} limit={6} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Banner />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Benefit props="md:py-20 py-10" />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Testimonial data={testimonialData} limit={6} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Instagram />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Brand />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ModalNewsletter />
      </Suspense>
    </>
  );
}
