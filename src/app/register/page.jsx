


"use client";
import React, { useState } from "react";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  mobileNumber: Yup.string().required("Mobile number is required"),
  emailId: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  street: Yup.string().required("Street is required"),
  pincode: Yup.string().required("Pincode is required"),
  password: Yup.string().required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const router = useRouter();
  const [country, setCountry] = useState([]);

  const baseURL = process.env.NEXT_PUBLIC_HOSTNAME + "register";

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      emailId: "",
      state: "",
      city: "",
      street: "",
      pincode: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      if (data.password === data.confirmpassword) {
        try {
          const requestBody = {
            firstName: data.firstName,
            lastName: data.lastName,
            mobileNumber: data.mobileNumber,
            emailId: data.emailId,
            country: data.country,
            state: data.state,
            city: data.city,
            street: data.street,
            pincode: data.pincode,
            password: data.password,
          };
          await axios
            .post(baseURL, requestBody)
            .then(function (res) {
              alert('Account created!');
              setCookie('email', JSON.stringify(data.emailId));
              router.push('/UserProfiledemo');
            })
            .catch(error => {
              console.log(error);
            });
        } catch (error) {
          console.error("Error registering user:", error);
          alert("Error registering user");
        }
      }
    },
  });

  const handleBlur = async (e) => {
    const fieldName = e.target.name;
    await formik.setFieldTouched(fieldName);
    await formik.validateField(fieldName);
  };

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb heading="Create An Account" subHeading="Create An Account" />
      </div>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Register</div>
              <form className="md:mt-7 mt-4" onSubmit={formik.handleSubmit}>
                <div className="flex justify-between mb-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg me-1"
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    value={formik.values.firstName}
                    required
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div>{formik.errors.firstName}</div>
                  )}
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    value={formik.values.lastName}
                    required
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div>{formik.errors.lastName}</div>
                  )}
                </div>
                <div className="mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="mobileNumber"
                    type="text"
                    name="mobileNumber"
                    placeholder="Enter mobile number"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                    <div>{formik.errors.mobileNumber}</div>
                  )}
                </div>
                <div className="email mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="emailId"
                    type="email"
                    name="emailId"
                    placeholder="Email address *"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    value={formik.values.emailId}
                    required
                  />
                  {formik.touched.emailId && formik.errors.emailId && (
                    <div>{formik.errors.emailId}</div>
                  )}
                </div>
                <div className="mb-5 mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    type="text"
                    name="state"
                    placeholder="State name"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    required
                    value={formik.values.state}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <div>{formik.errors.state}</div>
                  )}
                </div>
                <div className="flex justify-between mb-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg me-1"
                    type="text"
                    name="city"
                    placeholder="City name"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    required
                    value={formik.values.city}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div>{formik.errors.city}</div>
                  )}
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg me-1"
                    type="text"
                    name="street"
                    placeholder="Street name"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    required
                    value={formik.values.street}
                  />
                  {formik.touched.street && formik.errors.street && (
                    <div>{formik.errors.street}</div>
                  )}
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    type="text"
                    name="pincode"
                    placeholder="Enter Pincode"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    required
                    value={formik.values.pincode}
                  />
                  {formik.touched.pincode && formik.errors.pincode && (
                    <div>{formik.errors.pincode}</div>
                  )}
                </div>
                <div className="pass mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password *"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    required
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div>{formik.errors.password}</div>
                  )}
                </div>
                <div className="confirm-pass mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="confirmpassword"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password *"
                    onChange={formik.handleChange}
                    onBlur={handleBlur}
                    required
                    value={formik.values.confirmpassword}
                  />
                  {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                    <div>{formik.errors.confirmpassword}</div>
                  )}
                </div>
                <div className="flex items-center mt-5">
                  <div className="block-input">
                    <input type="checkbox" name="remember" id="remember" />
                    <Icon.CheckSquare
                      size={20}
                      weight="fill"
                      className="icon-checkbox"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="pl-2 cursor-pointer text-secondary2"
                  >
                    I agree to the
                    <Link
                      href={"#!"}
                      className="text-black hover:underline pl-1"
                    >
                      Terms of Use
                    </Link>
                  </label>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button className="button-main" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">Already have an account?</div>
                <div className="mt-2 text-secondary">
                  Welcome back. Sign in to access your personalized experience, saved preferences, and more. We're thrilled to have you with us again!
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={"/login"} className="button-main">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

