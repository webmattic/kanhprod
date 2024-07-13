"use client";
import React, { useEffect, useState } from "react";
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
// import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import {country , state , city} from "react-country-region-selector";


const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  mobile: Yup.string().required("Mobile number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  country: Yup.string().required("Country is required"),
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
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [countryValue, setCountryValue] = useState('');
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      country: "",
      state: "",
      city: "",
      street: "",
      pincode: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      if (values.password === values.confirmpassword) {
        try {
          await axios.post("/api/userApi", values);
          alert("User registered successfully");
          setCookie('user', JSON.stringify(values.firstname));
          router.push("/UserDashbosrd");
        } catch (error) {
          console.error("Error registering user:", error);
          alert("Error registering user");
        }
      } else {
        alert("Passwords do not match");
      }
    },
  });

  async function loadCountries() {
    await axios.get("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => {
        setCountry(res.data.data.map((c: any) => c.name))

      })
  }
  
  useEffect(() => {
    loadCountries()
    console.log(countryValue)
  })
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb
          heading="Create An Account"
          subHeading="Create An Account"
        />
      </div>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Register</div>
              <form
                className="md:mt-7 mt-4"
                onSubmit={formik.handleSubmit}
              // method="POST"
              >
                <div className="flex justify-between mb-5 ">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg me-1"
                    id="username"
                    name="firstname"
                    type="text"
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                    required
                  />
                  {formik.errors.firstname && (
                    <div>{formik.errors.firstname}</div>
                  )}
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="username"
                    name="lastname"
                    type="text"
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                    required
                  />
                  {formik.errors.firstname && (
                    <div>{formik.errors.lastname}</div>
                  )}
                </div>
                <div className=" mt-5 ">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="username"
                    type="text"
                    name="mobile"
                    placeholder="Enter Mobile Number"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    required
                  />
                  {formik.errors.mobile && <div>{formik.errors.mobile}</div>}
                </div>
                <div className="email mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="username"
                    type="email"
                    name="email"
                    placeholder=" Email address *"
                    onChange={formik.handleChange}
                    required
                    value={formik.values.email}
                  />
                  {formik.errors.email && <div>{formik.errors.email}</div>}
                </div>
                <div className="flex justify-between mb-5 mt-5 ">
                  <div className=" ">
                    {/* <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="username"
                      type="text"
                      name="country"
                      value={formik.values.country}
                      placeholder="country name"
                      onChange={formik.handleChange}
                      required
                    /> */}
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={country}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="select country" name="country" onChange={(formik.handleChange)} />}
                    />
                    {formik.errors.country && (
                      <div>{formik.errors.country}</div>
                    )}
                  </div>
                  <div className=" ">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      type="text"
                      name="state"
                      placeholder="state name"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.state}
                    />
                    {formik.errors.state && <div>{formik.errors.state}</div>}
                  </div>
                </div>
                <div className="flex justify-between mb-5 ">
                  <div className=" me-1">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      type="text"
                      name="city"
                      placeholder="city name"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.city}
                    />
                    {formik.errors.city && <div>{formik.errors.city}</div>}
                  </div>
                  <div className="me-1 ">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      type="text"
                      name="street"
                      placeholder="street name"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.street}
                    />
                    {formik.errors.street && <div>{formik.errors.street}</div>}
                  </div>

                  <div className=" ">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      type="text"
                      name="pincode"
                      placeholder="Enter Pincode"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.pincode}
                    />
                    {formik.errors.pincode && (
                      <div>{formik.errors.pincode}</div>
                    )}
                  </div>
                </div>

                <div className="pass mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password *"
                    onChange={formik.handleChange}
                    required
                    value={formik.values.password}
                  />
                  {formik.errors.password && (
                    <div>{formik.errors.password}</div>
                  )}
                </div>
                <div className="confirm-pass mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="confirmPassword"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirm Password *"
                    onChange={formik.handleChange}
                    required
                    value={formik.values.confirmpassword}
                  />
                  {formik.errors.confirmpassword && (
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
                      Terms of User
                    </Link>
                  </label>
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <button className="button-main">Register</button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">Already have an account?</div>
                <div className="mt-2 text-secondary">
                  Welcome back. Sign in to access your personalized experience,
                  saved preferences, and more. We{String.raw`'re`} thrilled to
                  have you with us again!
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
