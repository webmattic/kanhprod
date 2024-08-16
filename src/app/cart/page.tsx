"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { CartProvider, useCart } from '@/context/CartContext';
import { countdownTime } from '@/store/countdownTime';
import { useModalCartContext } from '@/context/ModalCartContext';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Rate from '@/components/Other/Rate';

const Cart = () => {
    const [selectedDays, setSelectedDays] = useState<{ [key: string]: number }>({});
    const [daysvalue, setDaysvalue] = useState<{ [key: string]: number }>({});
    const [timeLeft, setTimeLeft] = useState(countdownTime());
    const router = useRouter();

    const handleChangeDays = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setSelectedDays((prevSelectedDays) => ({
            ...prevSelectedDays,
            [name]: parseInt(value),
        }));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(countdownTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const { cartState, updateCart, removeFromCart, addDays } = useCart();

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        const itemToUpdate = cartState.cartArray.find((item) => item.id === productId);

        if (itemToUpdate) {
            updateCart(productId, newQuantity, itemToUpdate.selectedSize, itemToUpdate.selectedColor);
        }
    };

    let moneyForFreeship = 150;
    let [totalCart, setTotalCart] = useState<number>(0);
    let [discountCart, setDiscountCart] = useState<number>(0);
    let [shipCart, setShipCart] = useState<number>(30);
    let [applyCode, setApplyCode] = useState<number>(0);

    useEffect(() => {
        let total = 0;
        cartState.cartArray.forEach(item => {
            const itemPrice = daysvalue[item.id] || item.price;
            total += itemPrice * item.quantity;
        });
        setTotalCart(total);
    }, [cartState.cartArray, daysvalue]);

    const handleApplyCode = (minValue: number, discount: number) => {
        if (totalCart > minValue) {
            setApplyCode(minValue);
            setDiscountCart(discount);
        } else {
            alert(`Minimum order must be ${minValue}$`);
        }
    };

    if (totalCart < applyCode) {
        applyCode = 0;
        discountCart = 0;
    }

    if (totalCart < moneyForFreeship) {
        shipCart = 30;
    }

    if (cartState.cartArray.length === 0) {
        shipCart = 0;
    }

    const redirectToCheckout = () => {
        router.push(`/checkout?discount=${discountCart}&ship=${shipCart}`);
    };

    const handleDaysChange = (productId: string, event: SelectChangeEvent<number>) => {
        const days = event.target.value as number;
        const price = cartState.cartArray.find(item => item.id === productId)?.price || 0;

        if (days < 1) {
            throw new Error("Day must be 1 or greater");
        }

        let finalPrice = parseFloat(price.toFixed(2));

        for (let i = 1; i < days; i++) {
            finalPrice += price * 0.5;
        }

        setDaysvalue(prev => ({ ...prev, [productId]: finalPrice }));

        setSelectedDays((prev) => ({ ...prev, [productId]: days }));
        updateCart(
            productId,
            cartState.cartArray.find(item => item.id === productId)?.quantity || 1,
            cartState.cartArray.find(item => item.id === productId)?.selectedSize ?? '',
            cartState.cartArray.find(item => item.id === productId)?.selectedColor ?? ''
        );
    };

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
            </div>
            <div className="cart-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
                        <div className="xl:w-2/3 xl:pr-3 w-full">
                            <div className="time bg-green py-3 px-5 flex items-center rounded-lg">
                                <div className="heding5">🔥</div>
                                <div className="caption1 pl-2">Your cart will expire in
                                    <span className="min text-red text-button fw-700"> {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
                                    <span> minutes! Please checkout now before your items sell out!</span>
                                </div>
                            </div>
                            <div className="heading banner mt-5">
                                <div className="text">Buy
                                    <span className="text-button"> $<span className="more-price">{moneyForFreeship - totalCart > 0 ? (<>{moneyForFreeship - totalCart}</>) : (0)}</span>.00 </span>
                                    <span>more to get </span>
                                    <span className="text-button">freeship</span>
                                </div>
                                <div className="tow-bar-block mt-4">
                                    <div
                                        className="progress-line"
                                        style={{ width: totalCart <= moneyForFreeship ? `${(totalCart / moneyForFreeship) * 100}%` : `100%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="list-product w-full sm:mt-7 mt-5">
                                <div className='w-full'>
                                    <div className="heading bg-surface bora-4 pt-4 pb-4">
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <div className="text-button text-center">Products</div>
                                            </div>
                                            <div className="w-1/12">
                                                <div className="text-button text-center">Price</div>
                                            </div>
                                            <div className="w-1/6">
                                                <div className="text-button text-center">Quantity</div>
                                            </div>
                                            <div className="w-1/6">
                                                <div className="text-button text-center">Total Price</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-product-main w-full mt-3">
                                        {cartState.cartArray.length < 1 ? (
                                            <p className='text-button pt-3'>No product in cart</p>
                                        ) : (
                                            cartState.cartArray.map((product) => (
                                                <div className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full" key={product.id}>
                                                    <div className="w-1/2">
                                                        <div className="flex items-center gap-6">
                                                            <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                                                                <Image
                                                                    src={product.thumbImage[0]}
                                                                    width={1000}
                                                                    height={1000}
                                                                    alt={product.name}
                                                                    className='w-full h-full object-cover rounded-lg'
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="text-title">{product.name}</div>
                                                                <div className="list-select mt-3"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/12 price flex items-center justify-center">
                                                        <div className="text-title text-center"> ${product.price}.00</div>
                                                    </div>
                                                    <div className="w-1/6 flex items-center justify-center">
                                                        <div className="quantity-block bg-surface p-1 flex items-center justify-between rounded-lg flex-shrink-0 w-auto space-x-2">
                                                            <Icon.Minus
                                                                onClick={() => {
                                                                    if (product.quantity > 1) {
                                                                        handleQuantityChange(product.id, product.quantity - 1);
                                                                    }
                                                                }}
                                                                className={`text-sm ${product.quantity === 1 ? 'disabled' : ''}`}
                                                            />
                                                            <div className="text-sm quantity">{product.quantity}</div>
                                                            <Icon.Plus
                                                                onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                                                                className='text-sm'
                                                            />
                                                            <Box sx={{ minWidth: 80 }}>
                                                                <FormControl fullWidth size="small">
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={selectedDays[product.id] || 1}
                                                                        onChange={(e) => handleDaysChange(product.id, e)}
                                                                    >
                                                                        {[...Array(6)].map((_, i) => (
                                                                            <MenuItem key={i + 1} value={i + 1}>
                                                                                {i + 1} {i === 0 ? "Day" : "Days"}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/6 total-price flex items-center justify-center">
                                                        <div className="text-title text-center">${(daysvalue[product.id] || product.price) * product.quantity}.00</div>
                                                    </div>
                                                    <div className="w-1/12 flex items-center justify-center">
                                                        <Icon.Trash
                                                            onClick={() => removeFromCart(product.id)}
                                                            className='cursor-pointer'
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-sidebar xl:w-1/3 w-full bg-surface p-4 bora-4">
                            <div className="coupon mb-6">
                                <div className="input-group">
                                    <input type="text" placeholder="Coupon code" className="input " />
                                    <button onClick={() => handleApplyCode(100, 10)} className="btn bg-black text-white  py-1 px-5 rounded-lg shadow-lg">
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <div className="summary">
                                <div className="flex justify-between mb-2">
                                    <div className="text-title">Subtotal</div>
                                    <div className="text-title">${totalCart}.00</div>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <div className="text-title">Shipping</div>
                                    <div className="text-title">${shipCart}.00</div>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <div className="text-title">Discount</div>
                                    <div className="text-title">${discountCart}.00</div>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <div className="text-title">Total</div>
                                    <div className="text-title">${totalCart + shipCart - discountCart}.00</div>
                                </div>
                                <button
                                    onClick={redirectToCheckout}
                                    className="btn w-full bg-black text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;




// final right
// 'use client'
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import TopNavOne from '@/components/Header/TopNav/TopNavOne';
// import MenuOne from '@/components/Header/Menu/MenuOne';
// import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
// import Footer from '@/components/Footer/Footer';
// import * as Icon from "@phosphor-icons/react/dist/ssr";
// import { CartProvider, useCart } from '@/context/CartContext';
// import { countdownTime } from '@/store/countdownTime';
// import { useModalCartContext } from '@/context/ModalCartContext';
// import { useContext } from 'react';

// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

// import Rate from '@/components/Other/Rate';

// const Cart = () => {

//     const [selectedDays, setSelectedDays] = useState<{ [key: string]: number }>({});
//     const [daysvalue, setdaysvalue] = useState<{ [key: string]: number }>({});

//     const [timeLeft, setTimeLeft] = useState(countdownTime());
//     const router = useRouter();

//     const handleChangeDays = (event: SelectChangeEvent) => {
//         const { name, value } = event.target;
//         setSelectedDays((prevSelectedDays) => ({
//             ...prevSelectedDays,
//             [name]: parseInt(value),
//         }));
//     };

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft(countdownTime());
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     const { cartState, updateCart, removeFromCart, addDays } = useCart();

//     const handleQuantityChange = (productId: string, newQuantity: number) => {
//         const itemToUpdate = cartState.cartArray.find((item) => item.id === productId);

//         if (itemToUpdate) {
//             updateCart(productId, newQuantity, itemToUpdate.selectedSize, itemToUpdate.selectedColor);
//         }
//     };

//     let moneyForFreeship = 150;
//     let [totalCart, setTotalCart] = useState<number>(0);
//     let [discountCart, setDiscountCart] = useState<number>(0);
//     let [shipCart, setShipCart] = useState<number>(30);
//     let [applyCode, setApplyCode] = useState<number>(0);

//     cartState.cartArray.map(item => totalCart += item.price * item.quantity);

//     const handleApplyCode = (minValue: number, discount: number) => {
//         if (totalCart > minValue) {
//             setApplyCode(minValue);
//             setDiscountCart(discount);
//         } else {
//             alert(`Minimum order must be ${minValue}$`);
//         }
//     };

//     if (totalCart < applyCode) {
//         applyCode = 0;
//         discountCart = 0;
//     }

//     if (totalCart < moneyForFreeship) {
//         shipCart = 30;
//     }

//     if (cartState.cartArray.length === 0) {
//         shipCart = 0;
//     }

//     const redirectToCheckout = () => {
//         router.push(`/checkout?discount=${discountCart}&ship=${shipCart}`);
//     };

//     const handleDaysChange = (productId: string, event: SelectChangeEvent<number>) => {
//         const days = event.target.value as number;
//         const price = cartState.cartArray.find(item => item.id === productId)?.price || 0;

//         if (days < 1) {
//             throw new Error("Day must be 1 or greater");
//         }

//         let finalPrice = parseFloat(price.toFixed(2));

//         for (let i = 1; i < days; i++) {
//             finalPrice += price * 0.5;
//         }

//         setdaysvalue(prev => ({ ...prev, [productId]: finalPrice }));

//         setSelectedDays((prev) => ({ ...prev, [productId]: days }));
//         updateCart(
//             productId,
//             cartState.cartArray.find(item => item.id === productId)?.quantity || 1,
//             cartState.cartArray.find(item => item.id === productId)?.selectedSize ?? '',
//             cartState.cartArray.find(item => item.id === productId)?.selectedColor ?? ''
//         );
//     };

//     return (
//         <>
//             <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
//             <div id="header" className='relative w-full'>
//                 <MenuOne props="bg-transparent" />
//                 <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
//             </div>
//             <div className="cart-block md:py-20 py-10">
//                 <div className="container">
//                     <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
//                         <div className="xl:w-2/3 xl:pr-3 w-full">
//                             <div className="time bg-green py-3 px-5 flex items-center rounded-lg">
//                                 <div className="heding5">🔥</div>
//                                 <div className="caption1 pl-2">Your cart will expire in
//                                     <span className="min text-red text-button fw-700"> {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
//                                     <span> minutes! Please checkout now before your items sell out!</span>
//                                 </div>
//                             </div>
//                             <div className="heading banner mt-5">
//                                 <div className="text">Buy
//                                     <span className="text-button"> $<span className="more-price">{moneyForFreeship - totalCart > 0 ? (<>{moneyForFreeship - totalCart}</>) : (0)}</span>.00 </span>
//                                     <span>more to get </span>
//                                     <span className="text-button">freeship</span>
//                                 </div>
//                                 <div className="tow-bar-block mt-4">
//                                     <div
//                                         className="progress-line"
//                                         style={{ width: totalCart <= moneyForFreeship ? `${(totalCart / moneyForFreeship) * 100}%` : `100%` }}
//                                     ></div>
//                                 </div>
//                             </div>
//                             <div className="list-product w-full sm:mt-7 mt-5">
//                                 <div className='w-full'>
//                                     <div className="heading bg-surface bora-4 pt-4 pb-4">
//                                         <div className="flex">
//                                             <div className="w-1/2">
//                                                 <div className="text-button text-center">Products</div>
//                                             </div>
//                                             <div className="w-1/12">
//                                                 <div className="text-button text-center">Price</div>
//                                             </div>
//                                             <div className="w-1/6">
//                                                 <div className="text-button text-center">Quantity</div>
//                                             </div>
//                                             <div className="w-1/6">
//                                                 <div className="text-button text-center">Total Price</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="list-product-main w-full mt-3">
//                                         {cartState.cartArray.length < 1 ? (
//                                             <p className='text-button pt-3'>No product in cart</p>
//                                         ) : (
//                                             cartState.cartArray.map((product) => (
//                                                 <div className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full" key={product.id}>
//                                                     <div className="w-1/2">
//                                                         <div className="flex items-center gap-6">
//                                                             <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
//                                                                 <Image
//                                                                     src={product.thumbImage[0]}
//                                                                     width={1000}
//                                                                     height={1000}
//                                                                     alt={product.name}
//                                                                     className='w-full h-full object-cover rounded-lg'
//                                                                 />
//                                                             </div>
//                                                             <div>
//                                                                 <div className="text-title">{product.name}</div>
//                                                                 <div className="list-select mt-3"></div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-1/12 price flex items-center justify-center">
//                                                         <div className="text-title text-center"> ${product.price}.00</div>
//                                                     </div>
//                                                     <div className="w-1/6 flex items-center justify-center">
//                                                         <div className="quantity-block bg-surface p-1 flex items-center justify-between rounded-lg flex-shrink-0 w-auto space-x-2">
//                                                             <Icon.Minus
//                                                                 onClick={() => {
//                                                                     if (product.quantity > 1) {
//                                                                         handleQuantityChange(product.id, product.quantity - 1);
//                                                                     }
//                                                                 }}
//                                                                 className={`text-sm ${product.quantity === 1 ? 'disabled' : ''}`}
//                                                             />
//                                                             <div className="text-sm quantity">{product.quantity}</div>
//                                                             <Icon.Plus
//                                                                 onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
//                                                                 className='text-sm'
//                                                             />
//                                                             <Box sx={{ minWidth: 80 }}>
//                                                                 <FormControl fullWidth size="small">
//                                                                     <Select
//                                                                         labelId="demo-simple-select-label"
//                                                                         id="demo-simple-select"
//                                                                         value={selectedDays[product.id] || 1}
//                                                                         onChange={(e) => handleDaysChange(product.id, e)}
//                                                                     >
//                                                                         {[...Array(6)].map((_, i) => (
//                                                                             <MenuItem key={i + 1} value={i + 1}>
//                                                                                 {i + 1} {i === 0 ? "Day" : "Days"}
//                                                                             </MenuItem>
//                                                                         ))}
//                                                                     </Select>
//                                                                 </FormControl>
//                                                             </Box>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-1/6 total-price flex items-center justify-center">
//                                                         <div className="text-title text-center">${(daysvalue[product.id] || product.price) * product.quantity}.00</div>
//                                                     </div>
//                                                     <div className="w-1/12 flex items-center justify-center">
//                                                         <Icon.Trash
//                                                             onClick={() => removeFromCart(product.id)}
//                                                             className='cursor-pointer'
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             ))
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="checkout-sidebar xl:w-1/3 w-full bg-surface p-4 bora-4">
//                             <div className="coupon mb-6">
//                                 <div className="input-group">
//                                     <input type="text" placeholder="Coupon code" className="input" />
//                                     <button onClick={() => handleApplyCode(100, 10)} className="btn bg-black text-white">
//                                         Apply
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="summary">
//                                 <div className="flex justify-between mb-2">
//                                     <div className="text-title">Subtotal</div>
//                                     <div className="text-title">${totalCart}.00</div>
//                                 </div>
//                                 <div className="flex justify-between mb-2">
//                                     <div className="text-title">Shipping</div>
//                                     <div className="text-title">${shipCart}.00</div>
//                                 </div>
//                                 <div className="flex justify-between mb-2">
//                                     <div className="text-title">Discount</div>
//                                     <div className="text-title">${discountCart}.00</div>
//                                 </div>
//                                 <div className="flex justify-between mb-4">
//                                     <div className="text-title">Total</div>
//                                     <div className="text-title">${totalCart + shipCart - discountCart}.00</div>
//                                 </div>
//                                 <button onClick={redirectToCheckout} className="btn w-full bg-black text-white">
//                                     Proceed to Checkout
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Cart;




// 'use client'
// import React, { useState, useEffect } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import TopNavOne from '@/components/Header/TopNav/TopNavOne'
// import MenuOne from '@/components/Header/Menu/MenuOne'
// import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
// import Footer from '@/components/Footer/Footer'
// import * as Icon from "@phosphor-icons/react/dist/ssr";
// import { CartProvider, useCart } from '@/context/CartContext'
// import { countdownTime } from '@/store/countdownTime'
// import { useModalCartContext } from '@/context/ModalCartContext'
// import { useContext } from 'react'

// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

// import Rate from '@/components/Other/Rate'

// const Cart = () => {
//     const [age, setAge] = React.useState('');
//     const [selectedDays, setSelectedDays] = useState<{ [key: string]: number }>({});


//     const [timeLeft, setTimeLeft] = useState(countdownTime());
//     const router = useRouter()
//     const handleChange = (event: SelectChangeEvent) => {
//         setAge(event.target.value);
//         alert(age)
//     };


//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft(countdownTime());
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     const { cartState, updateCart, removeFromCart, addDays } = useCart();

//     const handleQuantityChange = (productId: string, newQuantity: number) => {
//         // Tìm sản phẩm trong giỏ hàng
//         const itemToUpdate = cartState.cartArray.find((item) => item.id === productId);

//         // Kiểm tra xem sản phẩm có tồn tại không
//         if (itemToUpdate) {
//             // Truyền giá trị hiện tại của selectedSize và selectedColor
//             updateCart(productId, newQuantity, itemToUpdate.selectedSize, itemToUpdate.selectedColor);
//         }
//     };

//     let moneyForFreeship = 150;
//     let [totalCart, setTotalCart] = useState<number>(0)
//     let [discountCart, setDiscountCart] = useState<number>(0)
//     let [shipCart, setShipCart] = useState<number>(30)
//     let [applyCode, setApplyCode] = useState<number>(0)

//     cartState.cartArray.map(item => totalCart += item.price * item.quantity)

//     const handleApplyCode = (minValue: number, discount: number) => {
//         if (totalCart > minValue) {
//             setApplyCode(minValue)
//             setDiscountCart(discount)
//         } else {
//             alert(`Minimum order must be ${minValue}$`)
//         }
//     }

//     if (totalCart < applyCode) {
//         applyCode = 0
//         discountCart = 0
//     }

//     if (totalCart < moneyForFreeship) {
//         shipCart = 30
//     }

//     if (cartState.cartArray.length === 0) {
//         shipCart = 0
//     }

//     const redirectToCheckout = () => {
//         router.push(`/checkout?discount=${discountCart}&ship=${shipCart}`)
//     }

//     const handleDaysChange = (productId: string, event: SelectChangeEvent<number>) => {
//         const days = event.target.value as number;
//         setSelectedDays((prev) => ({ ...prev, [productId]: days }));

//         updateCart(
//             productId,
//             cartState.cartArray.find(item => item.id === productId)?.quantity || 1,
//             cartState.cartArray.find(item => item.id === productId)?.selectedSize ?? '',
//             cartState.cartArray.find(item => item.id === productId)?.selectedColor ?? ''
//         );
//     };

//     return (
//         <>
//             <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
//             <div id="header" className='relative w-full'>
//                 <MenuOne props="bg-transparent" />
//                 <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
//             </div>
//             <div className="cart-block md:py-20 py-10">
//                 <div className="container">
//                     <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
//                         <div className="xl:w-2/3 xl:pr-3 w-full">
//                             <div className="time bg-green py-3 px-5 flex items-center rounded-lg">
//                                 <div className="heding5">🔥</div>
//                                 <div className="caption1 pl-2">Your cart will expire in
//                                     <span className="min text-red text-button fw-700"> {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
//                                     <span> minutes! Please checkout now before your items sell out!</span>
//                                 </div>
//                             </div>
//                             <div className="heading banner mt-5">
//                                 <div className="text">Buy
//                                     <span className="text-button"> $<span className="more-price">{moneyForFreeship - totalCart > 0 ? (<>{moneyForFreeship - totalCart}</>) : (0)}</span>.00 </span>
//                                     <span>more to get </span>
//                                     <span className="text-button">freeship</span>
//                                 </div>
//                                 <div className="tow-bar-block mt-4">
//                                     <div
//                                         className="progress-line"
//                                         style={{ width: totalCart <= moneyForFreeship ? `${(totalCart / moneyForFreeship) * 100}%` : '100%' }}
//                                     ></div>
//                                 </div>
//                             </div>
//                             <div className="list-product w-full sm:mt-7 mt-5">
//                                 <div className='w-full'>
//                                     <div className="heading bg-surface bora-4 pt-4 pb-4">
//                                         <div className="flex">
//                                             <div className="w-1/2">
//                                                 <div className="text-button text-center">Products</div>
//                                             </div>
//                                             <div className="w-1/12">
//                                                 <div className="text-button text-center">Price</div>
//                                             </div>
//                                             <div className="w-1/6">
//                                                 <div className="text-button text-center">Quantity</div>
//                                             </div>
//                                             <div className="w-1/6">
//                                                 <div className="text-button text-center">Total Price</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="list-product-main w-full mt-3">
//                                         {cartState.cartArray.length < 1 ? (
//                                             <p className='text-button pt-3'>No product in cart</p>
//                                         ) : (
//                                             cartState.cartArray.map((product) => (
//                                                 <div className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full" key={product.id}>
//                                                     <div className="w-1/2">
//                                                         <div className="flex items-center gap-6">
//                                                             <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
//                                                                 <Image
//                                                                     src={product.thumbImage[0]}
//                                                                     width={1000}
//                                                                     height={1000}
//                                                                     alt={product.name}
//                                                                     className='w-full h-full object-cover rounded-lg'
//                                                                 />
//                                                             </div>
//                                                             <div>
//                                                                 <div className="text-title">{product.name}</div>
//                                                                 <div className="list-select mt-3"></div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-1/12 price flex items-center justify-center">
//                                                         <div className="text-title text-center">${product.price}.00</div>
//                                                     </div>
//                                                     <div className="w-1/6 flex items-center justify-center">
//                                                         <div className="quantity-block bg-surface p-1 flex items-center justify-between rounded-lg flex-shrink-0 w-auto space-x-2">

//                                                             <Icon.Minus
//                                                                 onClick={() => {
//                                                                     if (product.quantity > 1) {
//                                                                         handleQuantityChange(product.id, product.quantity - 1);
//                                                                     }
//                                                                 }}
//                                                                 className={`text-sm ${product.quantity === 1 ? 'disabled' : ''}`}
//                                                             />
//                                                             <div className="text-sm quantity">{product.quantity}</div>
//                                                             <Icon.Plus
//                                                                 onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
//                                                                 className='text-sm'
//                                                             />
//                                                             <Box sx={{ minWidth: 80 }}>
//                                                                 <FormControl fullWidth size="small">
//                                                                     <InputLabel id={`days-select-${product.id}`}>Days</InputLabel>
//                                                                     <Select
//                                                                         labelId={`days-select-${product.id}`}
//                                                                         id={`days-select-${product.id}`}
//                                                                         value={selectedDays[product.id] || 1}
//                                                                         label="Days"
//                                                                         onChange={(e) => handleDaysChange(product.id, e)}
//                                                                     >
//                                                                         {[1, 2, 3, 4, 5, 6, 7].map(day => (
//                                                                             <MenuItem key={day} value={day}>{day}</MenuItem>
//                                                                         ))}
//                                                                     </Select>
//                                                                 </FormControl>
//                                                             </Box>
//                                                         </div>
//                                                     </div>
//                                                     <div className="w-1/6 flex items-center justify-center">
//                                                         <div className="total-price text-title text-center">${product.price * product.quantity * (selectedDays[product.id] || 1)}.00</div>
//                                                     </div>
//                                                     <div className="w-1/12 flex justify-center items-center">
//                                                         <Icon.Trash
//                                                             size={20}
//                                                             onClick={() => removeFromCart(product.id)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             ))
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="total-checkout xl:w-1/3 w-full xl:pl-8">
//                             <div className="bg-surface p-6 bora-4">
//                                 <div className="total-main w-full flex justify-between">
//                                     <div className="text-title">Total:</div>
//                                     <div className="text-title">${totalCart}.00</div>
//                                 </div>
//                                 <div className="mt-3 text-title">${discountCart}.00 discount applied</div>
//                                 <div className="mt-3 text-title">Shipping: ${shipCart}.00</div>
//                                 <div className="total-amount w-full flex justify-between">
//                                     <div className="text-title">Total Amount:</div>
//                                     <div className="text-title">${totalCart - discountCart + shipCart}.00</div>
//                                 </div>
//                                 <button className="btn-primary w-full mt-6" onClick={redirectToCheckout}>
//                                     Checkout
//                                 </button>
//                                 <div className="coupon-section mt-4">
//                                     <div className="coupon-text">Have a coupon code?</div>
//                                     <div className="flex gap-2 mt-2">
//                                         <input type="text" placeholder="Enter coupon code" className="form-input w-full" />
//                                         <button className="btn-primary" onClick={() => handleApplyCode(100, 10)}>Apply</button>
//                                     </div>
//                                 </div>
//                             </div>
//                             <Link href='/shop' className="btn-link w-full mt-6">
//                                 <Icon.CaretLeft size={20} />
//                                 <span>Continue Shopping</span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default Cart
