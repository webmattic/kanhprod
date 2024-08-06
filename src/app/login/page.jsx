// 'use client'
// import React, { useState } from 'react'
// import Link from 'next/link'
// import TopNavOne from '@/components/Header/TopNav/TopNavOne'
// import MenuOne from '@/components/Header/Menu/MenuOne'
// import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
// import Footer from '@/components/Footer/Footer'
// import * as Icon from "@phosphor-icons/react/dist/ssr";
// import { signIn } from "next-auth/react";
// import { useRouter } from 'next/navigation';
// import { setCookie } from 'cookies-next';



// const Login = () => {
//     const router = useRouter();

//     const submitHandler = async (data) => {
//         if (data.emailId === '' || data.password === '') {
//             alert('All fields are required!');
//             return;
//         }
//         console.log(data);
//         setCookie("email", data.emailId);

//         const resdata = await signIn("credentials", {
//             emailId: data.emailId,
//             password: data.password,
//             redirect: false,
//         });

//         console.log(resdata);
//         if (
//             resdata.status === 400 ||
//             resdata.status === 401 ||
//             resdata.status === 403
//         ) {
//             console.log("Invalid Credentials!");
//             alert('Invalid Credentials!');
//         } else if (resdata.status === 500) {
//             console.log(
//                 "Server error!"
//             );
//             alert('Server error!');
//         } else {
//             alert('Login successfull!');
//             router.push('/UserProfile');
//             console.log(resdata);
//         }
//     };


//     return (
//         <>
//             <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
//             <div id="header" className='relative w-full'>
//                 <MenuOne props="bg-transparent" />
//                 <Breadcrumb heading='Login' subHeading='Login' />
//             </div>
//             <div className="login-block md:py-20 py-10">
//                 <div className="container">
//                     <div className="content-main flex gap-y-8 max-md:flex-col">
//                         <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
//                             <div className="heading4">Login</div>
//                             <form className="md:mt-7 mt-4" onSubmit={(e) => {
//                                 e.preventDefault();
//                                 submitHandler({
//                                     emailId: e.target.emailId.value,
//                                     password: e.target.password.value,
//                                 });
//                             }}>
//                                 <div className="email ">
//                                     <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="username" name='emailId' type="email" placeholder="Username or email address *" required />
//                                 </div>
//                                 <div className="pass mt-5">
//                                     <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" name='password' id="password" type="password" placeholder="Password *" required />
//                                 </div>
//                                 <div className="flex items-center justify-between mt-5">
//                                     <div className='flex items-center'>
//                                         <div className="block-input">
//                                             <input
//                                                 type="checkbox"
//                                                 name='remember'
//                                                 id='remember'
//                                             />
//                                             <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
//                                         </div>
//                                         <label htmlFor='remember' className="pl-2 cursor-pointer">Remember me</label>
//                                     </div>
//                                     <Link href={'/forgot-password'} className='font-semibold hover:underline'>Forgot Your Password?</Link>
//                                 </div>
//                                 <div className="block-button md:mt-7 mt-4">
//                                     <button className="button-main">Login</button>
//                                 </div>
//                             </form>
//                         </div>
//                         <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
//                             <div className="text-content">
//                                 <div className="heading4">New Customer</div>
//                                 <div className="mt-2 text-secondary">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
//                                 <div className="block-button md:mt-7 mt-4">
//                                     <Link href={'/register'} className="button-main">Register</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     )
// }

// export default Login

'use client'
import React from 'react';
import Link from 'next/link';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Yup validation schema
const validationSchema = Yup.object({
    emailId: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            emailId: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (values.emailId === '' || values.password === '') {
                alert('All fields are required!');
                return;
            }

            console.log(values);
            setCookie("email", values.emailId);

            const resdata = await signIn("credentials", {
                emailId: values.emailId,
                password: values.password,
                redirect: false,
            });

            console.log(resdata);
            if (resdata.status === 400 || resdata.status === 401 || resdata.status === 403) {
                console.log("Invalid Credentials!");
                alert('Invalid Credentials!');
            } else if (resdata.status === 500) {
                console.log("Server error!");
                alert('Server error!');
            } else {
                alert('Login successful!');
                router.push('/UserProfile');
                console.log(resdata);
            }
        }
    });

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='Login' subHeading='Login' />
            </div>
            <div className="login-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4">Login</div>
                            <form className="md:mt-7 mt-4" onSubmit={formik.handleSubmit}>
                                <div className="email">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        id="username"
                                        name='emailId'
                                        type="email"
                                        placeholder="Username or email address *"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.emailId}
                                        required
                                    />
                                    {formik.touched.emailId && formik.errors.emailId ? (
                                        <div>{formik.errors.emailId}</div>
                                    ) : null}
                                </div>
                                <div className="pass mt-5">
                                    <input
                                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                        name='password'
                                        id="password"
                                        type="password"
                                        placeholder="Password *"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        required
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div>{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="flex items-center justify-between mt-5">
                                    <div className='flex items-center'>
                                        <div className="block-input">
                                            <input
                                                type="checkbox"
                                                name='remember'
                                                id='remember'
                                            />
                                            <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                        </div>
                                        <label htmlFor='remember' className="pl-2 cursor-pointer">Remember me</label>
                                    </div>
                                    <Link href={'/forgot-password'} className='font-semibold hover:underline'>Forgot Your Password?</Link>
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <button className="button-main" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4">New Customer</div>
                                <div className="mt-2 text-secondary">Be part of our growing family of new customers! Join us today and unlock a world of exclusive benefits, offers, and personalized experiences.</div>
                                <div className="block-button md:mt-7 mt-4">
                                    <Link href={'/register'} className="button-main">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;
