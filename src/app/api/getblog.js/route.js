
import connectDB from "../../../lib/db";
import Blog from "../../../model/Blog";

export async function GET() {

    connectDB()

    const blogData = await Blog.find({});
    let data = JSON.stringify(blogData);
    return new Response(data, {
        headers: {
            'Content-Type': 'application/json', 
        },
    });
}
