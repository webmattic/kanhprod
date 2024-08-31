"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { Tooltip } from '@headlessui/react';
import { Tooltip } from '@mui/material';
import { FaInfoCircle, FaCalendarAlt, FaUser, FaImage, FaTag, FaPen } from 'react-icons/fa';
import axios from 'axios';

const BlogForm = () => {
  const formik = useFormik({
    initialValues: {
      id: '',
      category: '',
      tag: '',
      title: '',
    //   date: '',
      author: '',
      avatar: '',
      thumbImg: '',
      coverImg: '',
      subImg: ['', ''],
      shortDesc: '',
      description: '',
      slug: '',
    },
    validationSchema: Yup.object({
      id: Yup.string().required('ID is required'),
      category: Yup.string().required('Category is required'),
      tag: Yup.string().required('Tag is required'),
      title: Yup.string().required('Title is required'),
    //   date: Yup.date().required('Date is required'),
      author: Yup.string().required('Author is required'),
      avatar: Yup.string().required('Avatar URL is required'),
      thumbImg: Yup.string().required('Thumbnail Image URL is required'),
      coverImg: Yup.string().required('Cover Image URL is required'),
      subImg: Yup.array().of(Yup.string().required('Sub Image URL is required')),
      shortDesc: Yup.string().required('Short Description is required'),
      description: Yup.string().required('Description is required'),
      slug: Yup.string().required('Slug is required'),
    }),
    onSubmit: values => {
      console.log(values);
      try
      {
        axios.post('/api/blog', values);
        alert('Blog post created successfully!');
      }
      catch(error)
      {
        console.log(error);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Create a New Blog Post</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* ID */}
        <div className="mb-6">
          <label htmlFor="id" className=" text-sm font-medium text-white flex items-center">
            ID 
            <Tooltip content="Unique identifier for the blog post" placement="top">
              <FaInfoCircle className="ml-2 text-gray-300" />
            </Tooltip>
          </label>
          <input
            id="id"
            name="id"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.id}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.id && formik.errors.id ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.id}</div>
          ) : null}
        </div>

        {/* Category */}
        <div className="mb-6">
          <label htmlFor="category" className="text-sm font-medium text-white flex items-center">
            Category 
            <FaTag className="ml-2" />
          </label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.category}</div>
          ) : null}
        </div>

        {/* Tag */}
        <div className="mb-6">
          <label htmlFor="tag" className="text-sm font-medium text-white flex items-center">
            Tag 
            <FaTag className="ml-2" />
          </label>
          <input
            id="tag"
            name="tag"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tag}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.tag && formik.errors.tag ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.tag}</div>
          ) : null}
        </div>

        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className=" text-sm font-medium text-white flex items-center">
            Title 
            <FaPen className="ml-2" />
          </label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.title}</div>
          ) : null}
        </div>

        {/* Date */}
        {/* <div className="mb-6">
          <label htmlFor="date" className=" text-sm font-medium text-white flex items-center">
            Date 
            <FaCalendarAlt className="ml-2" />
          </label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.date}</div>
          ) : null}
        </div> */}

        {/* Author */}
        <div className="mb-6">
          <label htmlFor="author" className=" text-sm font-medium text-white flex items-center">
            Author 
            <FaUser className="ml-2" />
          </label>
          <input
            id="author"
            name="author"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.author}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.author && formik.errors.author ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.author}</div>
          ) : null}
        </div>

        {/* Avatar */}
        <div className="mb-6">
          <label htmlFor="avatar" className=" text-sm font-medium text-white flex items-center">
            Avatar URL 
            <FaImage className="ml-2" />
          </label>
          <input
            id="avatar"
            name="avatar"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.avatar}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.avatar && formik.errors.avatar ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.avatar}</div>
          ) : null}
        </div>

        {/* Thumbnail Image */}
        <div className="mb-6">
          <label htmlFor="thumbImg" className=" text-sm font-medium text-white flex items-center">
            Thumbnail Image URL 
            <FaImage className="ml-2" />
          </label>
          <input
            id="thumbImg"
            name="thumbImg"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.thumbImg}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.thumbImg && formik.errors.thumbImg ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.thumbImg}</div>
          ) : null}
        </div>

        {/* Cover Image */}
        <div className="mb-6">
          <label htmlFor="coverImg" className=" text-sm font-medium text-white flex items-center">
            Cover Image URL 
            <FaImage className="ml-2" />
          </label>
          <input
            id="coverImg"
            name="coverImg"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.coverImg}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.coverImg && formik.errors.coverImg ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.coverImg}</div>
          ) : null}
        </div>

        {/* Sub Images */}
        <div className="mb-6">
          <label htmlFor="subImg" className="block text-sm font-medium text-white">Sub Images</label>
          {formik.values.subImg.map((img, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                id={`subImg-${index}`}
                name={`subImg[${index}]`}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subImg[index]}
                placeholder={`Sub Image URL ${index + 1}`}
                className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
              />
              {formik.touched.subImg && formik.errors.subImg ? (
                <div className="text-red-400 text-sm ml-2">{formik.errors.subImg[index]}</div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Short Description */}
        <div className="mb-6">
          <label htmlFor="shortDesc" className=" text-sm font-medium text-white flex items-center">
            Short Description 
            <FaPen className="ml-2" />
          </label>
          <textarea
            id="shortDesc"
            name="shortDesc"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shortDesc}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.shortDesc && formik.errors.shortDesc ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.shortDesc}</div>
          ) : null}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className=" text-sm font-medium text-white flex items-center">
            Description 
            <FaPen className="ml-2" />
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.description}</div>
          ) : null}
        </div>

        {/* Slug */}
        <div className="mb-6">
          <label htmlFor="slug" className=" text-sm font-medium text-white flex items-center">
            Slug 
            <FaTag className="ml-2" />
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.slug}
            className="mt-2 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-white focus:ring-white sm:text-sm p-3"
          />
          {formik.touched.slug && formik.errors.slug ? (
            <div className="text-red-400 text-sm mt-2">{formik.errors.slug}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-white text-indigo-600 py-3 px-6 rounded-md shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transform transition duration-300 hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
