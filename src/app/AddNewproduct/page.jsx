// "use client"


// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import ReactPhotoUploader from '../../components/ReactPhotoUploader'; // Adjust the path if necessary

// const AddProduct = () => {
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       brand: '',
//       sold: 0,
//       quantity: '',
//       quantityPurchase: 1,
//       sizes: '',
//       variation: '',
//       thumbImage: [],
//       images: [],
//       description: '',
//       action: '',
//       slug: '',
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required('Product name is required'),
//       brand: Yup.string().required('Brand is required'),
//       quantity: Yup.number().required('Quantity is required'),
//       sizes: Yup.string().required('Sizes are required'),
//       variation: Yup.string().required('Variation is required'),
//       description: Yup.string().required('Description is required'),
//       action: Yup.string().required('Action is required'),
//       slug: Yup.string().required('Slug is required'),
//     }),
//     onSubmit: async (values) => {
//       try {
//         const response = await axios.post('/api/products', {
//           ...values,
//           sizes: values.sizes.split(','), // Convert comma-separated string to array
//           variation: values.variation.split(','), // Convert comma-separated string to array
//         });
//         console.log('Product added:', response.data);
//       } catch (error) {
//         alert.error('Error adding product:', error);
//       }
//     },
//   });

//   const handleImageUpload = (images) => {
//     formik.setFieldValue('images', images);
//   };

//   const handleThumbImageUpload = (images) => {
//     formik.setFieldValue('thumbImage', images);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {formik.touched.name && formik.errors.name && (
//             <div className="text-red-500 text-sm">{formik.errors.name}</div>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Brand</label>
//           <input
//             type="text"
//             name="brand"
//             value={formik.values.brand}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {formik.touched.brand && formik.errors.brand && (
//             <div className="text-red-500 text-sm">{formik.errors.brand}</div>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Quantity</label>
//           <input
//             type="number"
//             name="quantity"
//             value={formik.values.quantity}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {formik.touched.quantity && formik.errors.quantity && (
//             <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Sizes (comma-separated)</label>
//           <input
//             type="text"
//             name="sizes"
//             value={formik.values.sizes}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {formik.touched.sizes && formik.errors.sizes && (
//             <div className="text-red-500 text-sm">{formik.errors.sizes}</div>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Variation (comma-separated)</label>
//           <input
//             type="text"
//             name="variation"
//             value={formik.values.variation}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {formik.touched.variation && formik.errors.variation && (
//             <div className="text-red-500 text-sm">{formik.errors.variation}</div>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Product Images</label>
//           <ReactPhotoUploader onUpload={handleImageUpload} />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Thumbnail Image</label>
//           <ReactPhotoUploader onUpload={handleThumbImageUpload} />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             name="description"
//             value={formik.values.description}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {formik.touched.description && formik.errors.description && (
//             <div className="text-red-500 text-sm">{formik.errors.description}</div>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Action</label>
//           <input
//             type="text"
//             name="action"
//             value={formik.values.action}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {formik.touched.action && formik.errors.action && (
//             <div className="text-red-500 text-sm">{formik.errors.action}</div>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Slug</label>
//           <input
//             type="text"
//             name="slug"
//             value={formik.values.slug}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {formik.touched.slug && formik.errors.slug && (
//             <div className="text-red-500 text-sm">{formik.errors.slug}</div>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


// "use client";

// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';


// const AddProduct = () => {
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             brand: '',
//             sold: 0,
//             quantity: '',
//             quantityPurchase: 1,
//             sizes: '',
//             variation: '',
//             thumbImage: '',
//             images: '',
//             description: '',
//             action: '',
//             slug: '',
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required('Product name is required'),
//             brand: Yup.string().required('Brand is required'),
//             quantity: Yup.number().required('Quantity is required'),
//             sizes: Yup.string().required('Sizes are required'),
//             variation: Yup.string().required('Variation is required'),
//             thumbImage: Yup.string().required('Thumbnail image is required'),
//             images: Yup.string().required('Images are required'),
//             description: Yup.string().required('Description is required'),
//             action: Yup.string().required('Action is required'),
//             slug: Yup.string().required('Slug is required'),
//         }),
//         onSubmit: async (values) => {
//             try {
//                 const response = await axios.post('/api/products', {
//                     ...values,
//                     sizes: values.sizes.split(','), 
//                     variation: values.variation.split(','), 
//                 });
//                 console.log('Product added:', response.data);
//             } catch (error) {
//                 alert.error('Error adding product:', error);
//             }
//         },
//     });



//     return (
//         <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
//             <form onSubmit={formik.handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700">Product Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formik.values.name}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {formik.touched.name && formik.errors.name && (
//                         <div className="text-red-500 text-sm">{formik.errors.name}</div>
//                     )}
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700">Brand</label>
//                     <input
//                         type="text"
//                         name="brand"
//                         value={formik.values.brand}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {formik.touched.brand && formik.errors.brand && (
//                         <div className="text-red-500 text-sm">{formik.errors.brand}</div>
//                     )}
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700">Quantity</label>
//                     <input
//                         type="number"
//                         name="quantity"
//                         value={formik.values.quantity}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {formik.touched.quantity && formik.errors.quantity && (
//                         <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
//                     )}
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700">Sizes (comma-separated)</label>
//                     <input
//                         type="text"
//                         name="sizes"
//                         value={formik.values.sizes}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {formik.touched.sizes && formik.errors.sizes && (
//                         <div className="text-red-500 text-sm">{formik.errors.sizes}</div>
//                     )}
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700">Variation (comma-separated)</label>
//                     <input
//                         type="text"
//                         name="variation"
//                         value={formik.values.variation}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {formik.touched.variation && formik.errors.variation && (
//                         <div className="text-red-500 text-sm">{formik.errors.variation}</div>
//                     )}
//                 </div>

//                 <div className="mb-4">
                    
//                     <label className="block text-gray-700">Image</label>
//                     <input type="text"
//                         name="images"
//                         placeholder="Image URL or path"
//                         value={formik.values.images}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />

//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700">Thumbnail Image</label>
                    
//                     <input type="text"
//                         name="thumbImage"
//                         placeholder="Thumb Image URL or path"
//                         value={formik.values.thumbImage}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"


//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700">Description</label>
//                     <textarea
//                         name="description"
//                         value={formik.values.description}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {formik.touched.description && formik.errors.description && (
//                         <div className="text-red-500 text-sm">{formik.errors.description}</div>
//                     )}
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700">Action</label>
//                     <input
//                         type="text"
//                         name="action"
//                         value={formik.values.action}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {formik.touched.action && formik.errors.action && (
//                         <div className="text-red-500 text-sm">{formik.errors.action}</div>
//                     )}
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-gray-700">Slug</label>
//                     <input
//                         type="text"
//                         name="slug"
//                         value={formik.values.slug}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {formik.touched.slug && formik.errors.slug && (
//                         <div className="text-red-500 text-sm">{formik.errors.slug}</div>
//                     )}
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                 >
//                     Add Product
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddProduct;


"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AddProduct = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            brand: '',
            sold: 0,
            quantity: '',
            quantityPurchase: 1,
            sizes: '',
            variation: '',
            thumbImage: '',
            images: '',
            description: '',
            action: '',
            slug: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Product name is required'),
            brand: Yup.string().required('Brand is required'),
            quantity: Yup.number().required('Quantity is required'),
            sizes: Yup.string().required('Sizes are required'),
            variation: Yup.string().required('Variation is required'),
            thumbImage: Yup.string().required('Thumbnail image is required'),
            images: Yup.string().required('Images are required'),
            description: Yup.string().required('Description is required'),
            action: Yup.string().required('Action is required'),
            slug: Yup.string().required('Slug is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('/api/products', {
                    ...values,
                    sizes: values.sizes.split(','), 
                    variation: values.variation.split(','), 
                });
                console.log('Product added:', response.data);
                resetForm(); // Reset the form after successful submission
            } catch (error) {
                console.error('Error adding product:', error);
                alert('Error adding product:', error.message);
            }
        },
    });

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.brand && formik.errors.brand && (
                        <div className="text-red-500 text-sm">{formik.errors.brand}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                        <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Sizes (comma-separated)</label>
                    <input
                        type="text"
                        name="sizes"
                        value={formik.values.sizes}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.sizes && formik.errors.sizes && (
                        <div className="text-red-500 text-sm">{formik.errors.sizes}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Variation (comma-separated)</label>
                    <input
                        type="text"
                        name="variation"
                        value={formik.values.variation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.variation && formik.errors.variation && (
                        <div className="text-red-500 text-sm">{formik.errors.variation}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Images</label>
                    <input
                        type="text"
                        name="images"
                        placeholder="Image URL or path"
                        value={formik.values.images}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.images && formik.errors.images && (
                        <div className="text-red-500 text-sm">{formik.errors.images}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Thumbnail Image</label>
                    <input
                        type="text"
                        name="thumbImage"
                        placeholder="Thumb Image URL or path"
                        value={formik.values.thumbImage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.thumbImage && formik.errors.thumbImage && (
                        <div className="text-red-500 text-sm">{formik.errors.thumbImage}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500 text-sm">{formik.errors.description}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Action</label>
                    <input
                        type="text"
                        name="action"
                        value={formik.values.action}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.action && formik.errors.action && (
                        <div className="text-red-500 text-sm">{formik.errors.action}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formik.values.slug}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formik.touched.slug && formik.errors.slug && (
                        <div className="text-red-500 text-sm">{formik.errors.slug}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;


