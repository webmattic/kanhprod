

import connectDB from '../../../lib/db';
import Products from '../../../lib/model/products';

connectDB();

export async function GET() {
    try {
        const products = await Products.find();
        return new Response(JSON.stringify(products), {
            status: 200,
        });
    } catch (error) {    
        console.error("Error fetching products:", error);
        return new Response("Error fetching products", {
            status: 500,
        });
    }
}