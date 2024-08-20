// import connectDB from '../../../lib/db';
// import Products from '../../../lib/model/products';

// connectDB();

// export async function POST(req) {
//     try {
//         const { name, brand, sold, quantity, quantityPurchase, sizes, variation, thumbImage, images, description, action, slug, createdAt } = await req.json();
//         const products = await Products.create({ name, brand, sold, quantity, quantityPurchase, sizes, variation, thumbImage, images, description, action, slug, createdAt });
//         const data = JSON.stringify(products);
//         console.log(data);
//         return new Response(data, {
//             status: 200,
//         });
//     } catch (error) {
//         console.error("Error creating product:", error);
//         return new Response("Error creating product", {
//             status: 500,
//         });
//     }
// }


// import connectDB from '../../../lib/db';
// import Products from '../../../lib/model/products';
// import Users from '../../../lib/model/users'; // Assuming 'users' model is exported from this path

// connectDB();

// export async function POST(req) {
//     try {
//         const { userId, name, brand, sold, quantity, quantityPurchase, sizes, variation, thumbImage, images, description, action, slug, createdAt } = await req.json();

//         // Create the product
//         const product = await Products.create({ name, brand, sold, quantity, quantityPurchase, sizes, variation, thumbImage, images, description, action, slug, createdAt });

//         // Find the user by userId and update their products array
//         const user = await Users.findByIdAndUpdate(
//             userId,
//             { $push: { products: product._id } },
//             { new: true } // Return the updated document
//         );

//         if (!user) {
//             return new Response("User not found", { status: 404 });
//         }

//         let data = JSON.stringify({ product, user });
//         console.log(data);
//         return new Response(data, {
//             status: 200,
//         });
//     } catch (error) {
//         console.error("Error adding product to user:", error);
//         return new Response("Error adding product to user", {
//             status: 500,
//         });
//     }
// }


// import connectDB from '../../../lib/db';

// import Products from '../../../lib/model/products';

// connectDB();

// export async function POST(req) {
//     try {
//         const { name, brand, sold, quantity, quantityPurchase, sizes, variation, thumbImage, images, description, action, slug, createdAt } = await req.json();
//         const products = await Products.create({ name, brand, sold, quantity, quantityPurchase, sizes, variation, thumbImage, images, description, action, slug, createdAt });  

//         let data = JSON.stringify(products);
//         console.log(data);
//         return new Response(data, {
//             status: 200,
//         });
//     } catch (error) {
//         console.error("Error creating product:", error);
//         return new Response("Error creating product", {
//             status: 500,
//         });
//     }
// }


import connectDB from '../../../lib/db';
import Products from '../../../lib/model/products';

connectDB();

export async function POST(req) {
    try {

        const { name, brand, sold, quantity, quantityPurchase, sizes, variation, thumbImage, images, description, action, slug, createdAt } = await req.json();


        const product = await Products.create({
            name,
            brand,
            sold,
            quantity,
            quantityPurchase,
            sizes,
            variation,
            thumbImage,
            images,
            description,
            action,
            slug,
            createdAt
        });


        return new Response(JSON.stringify(product), {
            status: 200,
        });
    } catch (error) {
        console.error("Error creating product:", error);


        return new Response("Error creating product", {
            status: 500,
        });
    }
}
