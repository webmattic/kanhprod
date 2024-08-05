"use client"

import React, { useEffect, useState } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    emailId: '',
    country: '',
    state: '',
    city: ' ',
    street: '',
    pincode: '',
  });
  let route = useRouter();
  function logoutClick() {
    deleteCookie('email');
    route.push('/login');


  }
var user = getCookie('email');

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const mail = getCookie('email');

    axios.get('http://localhost:3000/api/login', {
      headers: {
        'Authorization': `Bearer ${getCookie('token')}`,
      },
    }).then((response) => {
      try {
        const users = response.data;
        const result = users.find(item => item.emailId === mail);
        console.log(result);
        if (result) {
          const user = result;
          setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            emailId: user.emailId,
            country: user.country,
            state: user.state,
            city: user.city,
            street: user.street,
            pincode: user.pincode,
          });
        }
      } catch (error) {
        console.error(error);
      }



    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save data to the backend or handle form submission
    setIsEditing(false);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={logoutClick}
            className=" py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm"
          >
            Logout
          </button>
          <h1>Wellcome -{user} </h1>
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700"
              >
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 block w-full p-2 border ${isEditing ? 'border-gray-300' : 'border-transparent'
                  } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${!isEditing && 'bg-gray-100'
                  }`}
              />
            </div>
          ))}
          {isEditing ? (
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleEditToggle}
                className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleEditToggle}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
          )}


        </form>
      </div>
    </div>
  );
}