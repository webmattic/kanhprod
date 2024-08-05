 
import connectDB from '../../../lib/db';
import Users from '../../../lib/model/user';


connectDB()


export async function PUT(req) {
    const { firstName, lastName, mobileNumber, emailId, country, state, city, street, pincode } = await req.json();
    const users = await Users.findOneAndUpdate({ emailId }, { firstName, lastName, mobileNumber, emailId, country, state, city, street, pincode });
    let data = JSON.stringify(users);
    console.log(data);
    return new Response(data, {
        status: 200,
    });
}   

