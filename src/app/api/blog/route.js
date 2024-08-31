


// import connectDB from "../../../lib/db";
// import Blog from "../../../lib/model/blog";

// export async function POST() {
//     await connectDB();

//     try {

//         const { title, category, tag, author, avatar, thumbImg, coverImg, subImg, shortDesc, description, slug } = await req.json();
//         const blogs = await Blog.create({ title, category, tag, author, avatar, thumbImg, coverImg, subImg, shortDesc, description, slug });
//         let data = JSON.stringify(blogs);
//         return new Response(data, { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify(error), { status: 500 });
//     }

// }


import Blog from '../../../lib/model/blog';

import connectDB from '../../../lib/db';


connectDB()
export async function POST(request) {
    // blog post request

    const { id, title, category, tag, author, avatar, thumbImg, coverImg, subImg, shortDesc, description, slug } = await request.json();
    const blog = await Blog.create({ id, title, category, tag, author, avatar, thumbImg, coverImg, subImg, shortDesc, description, slug });
    let data = JSON.stringify(blog);
    return new Response(data, {
        status: 200,
    });
}

