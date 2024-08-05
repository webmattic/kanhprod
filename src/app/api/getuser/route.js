

import connectDB from '../../../lib/db';
import Users from '../../../lib/model/user';


connectDB()

export async function GET(request) {
    const{emailId} = await request.json();
    
    const users = await Users.findOne({ emailId });

    let data = JSON.stringify(users);
    console.log(data);
    return new Response(data, {
        status: 200,
    });

}