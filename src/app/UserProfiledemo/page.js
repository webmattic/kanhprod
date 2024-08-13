// 

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function UserProfiledemo() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        emailId: '',
        country: '',
        state: '',
        city: '',
        street: '',
        pincode: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [productData, setProductData] = useState([]);
    const route = useRouter();
    const date = new Date();

    // const productData = [
    //     { itemname: "Kanh Diplomat", quantity: "1", price: "2400", deliver: "Mumbai" },
    //     { itemname: "Kanh Diplomat", quantity: "1", price: "2400", deliver: "Mumbai" },
    //     { itemname: "Kanh Diplomat", quantity: "1", price: "2400", deliver: "Mumbai" },
    // ];/
    
    useEffect(() => {
        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: user,
        enableReinitialize: true, // To reinitialize form values when `user` state changes
        onSubmit: (values) => {
            console.log('Updated values:', values);
            setIsEditing(false);
        },
    });

    const fetchData = async () => {
        const mail = getCookie('email');
        await axios.get('http://localhost:3000/api/login', {
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
            },
        }).then((response) => {
            const users = response.data;
            const result = users.find(item => item.emailId === mail);
            if (result) {
                setUser({
                    firstName: result.firstName,
                    lastName: result.lastName,
                    mobileNumber: result.mobileNumber,
                    emailId: result.emailId,
                    country: result.country,
                    state: result.state,
                    city: result.city,
                    street: result.street,
                    pincode: result.pincode,
                });
                
                setProductData(result.product || []);
                alert(productData);
            
            
                // alert(productData);



            }
        }).catch(error => {
            console.error(error);
        });
    };

    const handleEditToggle = () => {
        if (isEditing) {
            formik.handleSubmit();
        } else {
            setIsEditing(true);
        }
    };

    const logoutClick = () => {
        deleteCookie('email');
        route.push('/login');
    };

    return (
        <div className="grid grid-cols-3 mt-20">
            <div className="text-center">
                <div className="flex justify-center p-3">
                    <img className="w-20 h-20 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar" />
                </div>
                <div>
                    <p className="font-bold text-3xl p-3">{user.firstName} {user.lastName}</p>
                    <p className="text-xl font-bold">{user.emailId}</p>
                    <button
                        type="button"
                        onClick={() => setShowOrders(!showOrders)}
                        className="py-2 px-4 font-semibold rounded-md shadow-sm"
                    >
                        {showOrders ? "Edit Profile" : "Orders"}
                    </button>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={logoutClick}
                            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-2 border-s border-slate-400">
                <div className="p-3 ms-10">
                    <p className="text-3xl font-bold">Hello {user.firstName}</p>
                    <p className="text-xl font-bold">{date.toDateString()}</p>
                </div>
                {showOrders ? (
                    <div className="p-3 ms-10 mt-10">
                        <p className="text-3xl font-bold">Your Products</p>
                        <div className="overflow-x-auto mt-9 ms-2">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-t-slate-400">
                                <thead className="text-xl text-gray-500 border-t-slate-400">
                                    <tr className="border-b dark:border-gray-500">
                                        <th scope="col">Item Name</th>
                                        <th className="px-6 py-3" scope="col">QTY</th>
                                        <th className="px-6 py-3" scope="col">Price</th>
                                        <th className="px-6 py-3" scope="col">Deliver Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.map((data) => (
                                        <tr key={data.itemname} className="bg-white border-b">
                                            <td scope="row" className="font-medium whitespace-nowrap">{data.itemname}</td>
                                            <td className="px-6 py-4">{data.itemname}</td>
                                            <td className="px-6 py-4">{data.price}</td>
                                            <td className="px-6 py-4">{data.deliver}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="p-3 ms-10 mt-10">
                        <div className="border-b flex justify-between py-4 me-20">
                            <p className="text-3xl font-bold">Your Profile</p>
                            <button
                                className="px-12 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500"
                                onClick={handleEditToggle}
                            >
                                {isEditing ? "Save" : "Edit"}
                            </button>
                        </div>
                        <div className="overflow-x-auto max-w-sm mt-9 ms-2">
                            <form onSubmit={formik.handleSubmit}>
                                {Object.keys(user).map((key) => (
                                    key !== "_id" && key !== "password" && key !== "__v" && key !== "createdAt" && (
                                        <div key={key} className="mb-4 grid grid-cols-2">
                                            <label className="block text-black font-bold mb-2 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1')}:
                                            </label>
                                            <input
                                                type="text"
                                                name={key}
                                                value={formik.values[key] || ""}
                                                onChange={formik.handleChange}
                                                readOnly={!isEditing}
                                                className={`w-full px-3 py-2 border rounded ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-100 border-transparent'}`}
                                            />
                                        </div>
                                    )
                                ))}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
