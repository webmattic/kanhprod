
"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getCookie } from 'cookies-next'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const UserDashboard = () => {

    const[country, setcountry] = useState()
    useEffect(() => {
       console.log(CountryDropdown)
        
    } , [])
    return (
        <div className='flex justify-center items-center' style={{ height: '100vh' }}>
            <h1 className='text-3xl font-extrabold'>Well Come{getCookie("user")}</h1>

            <form>

                <CountryDropdown
                    name="country"  
                    value="country"
                    onChange={val => console.log('CountryDropdown', val)}
                />
            </form>
        </div>
    )
}

export default UserDashboard