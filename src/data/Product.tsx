import axios from "axios";
import { type } from "os";
import React from "react";
import { ProductType } from '@/type/ProductType'




export default async function productData() {

    const res = axios.get("http://localhost:3000/api/getProducts");
    return res;
}


