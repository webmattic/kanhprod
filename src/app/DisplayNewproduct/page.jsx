

"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductCart = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/getProducts');
                alert(response.data);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Products Cart</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                        <img 
                            src={product.images}
                            alt={product.name} 
                            className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="mt-4">
                            <h3 className="text-lg font-bold">{product.name}</h3>
                            <p className="text-gray-600">Brand: {product.brand}</p>
                            <p className="text-gray-600">Quantity: {product.quantity}</p>
                            <p className="text-gray-600">Price: ${product.price}</p>
                            <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCart;
