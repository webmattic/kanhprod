import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
export async function middleware(req: NextRequest) {
    console.log("running.....")
    let verified = req.cookies.get('email')

    // if (!verified) {
    //     return NextResponse.redirect(new URL('/login', req.url))    

    // }

    

    // let url = req.nextUrl.pathname
    // console.log(url)
    //  if (!verified && (req.nextUrl.pathname.startsWith('/about') || req.nextUrl.pathname.startsWith('/home'))) {
    //         return NextResponse.redirect(new URL('/', req.url))

    //     }

   


}

// import { NextResponse } from "next/server";
// import type { NextRequest } from 'next/server'

// export async function middleware(req: NextRequest) {
//     const verifiedCookie = req.cookies.get('email');
//     const isVerified = verifiedCookie?.value === 'true'; // Handle potential null or undefined

//     if (!isVerified && req.nextUrl.pathname.startsWith('/home')) {
//         try {
//             return NextResponse.redirect(new URL('/', req.url));
//         } catch (error) {
//             console.error('Error redirecting:', error);
//             // Handle the error, e.g., return a custom response
//         }
//     }
// }


// async function middleware(req: NextRequest) {
//     // Retrieve the 'email' cookie
//     const email = req.cookies.get('email');

//     // Check if the 'email' cookie is not present and the request is for a path starting with '/home'
//     if (!email && req.nextUrl.pathname.startsWith('/home')) {
//         // Redirect to the root URL if the conditions are met
//         return NextResponse.redirect(new URL('/', req.url));
//     }

//     // If the conditions are not met, continue the middleware chain
//     return NextResponse.next();
// }