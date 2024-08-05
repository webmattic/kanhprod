



import connectDB from '../../../lib/db';
import Users from '../../../lib/model/user';
import bcrypt from 'bcrypt';

connectDB()

export async function GET(request) {
    const users = await Users.find({});

    let data = JSON.stringify(users);
    console.log(data);
    return new Response(data, {
        status: 200,
    });

}

export async function POST(request) {

    const { emailId, password } = await request.json();

    // Check if email and password are provided
    if (!emailId || !password) {
        return new Response(JSON.stringify({
            success: false,
            status: 400,
            message: 'email and password are required',
            data: emailId,
        }));
    }

    // Find the user in the database
    const user = await Users.findOne({ emailId });

    // If user is not found, return an error
    // if (!user) {
    //     return new Response(JSON.stringify({
    //         success: false,
    //         status: 400,
    //         message: 'Invalid credentials'
    //     }));
    // }
    // if (password == user.password) {
    //     return new Response(JSON.stringify({
    //         success: true,
    //         status: 200,
    //         data: user
    //     }));
    // } else {
    //     return new Response(JSON.stringify({
    //         success: false,
    //         status: 400,
    //         message: 'Wrong Password'
    //     }));
    // }



    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        return new Response(JSON.stringify({
            success: true,
            status: 200,
            data: user
        }));
    } else {
        return new Response(JSON.stringify({
            success: false,
            status: 400,
            message: 'Wrong Password'
        }));
    }

}