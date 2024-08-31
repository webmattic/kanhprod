import mongoose , { Schema } from 'mongoose';
import { date } from 'yup';

const blogSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type:date,
        default: Date.now
       
    },
    author: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    thumbImg: {
        type: String,
        required: true
    },
    coverImg: {
        type: String,
        required: true
    },
    subImg: [{
        type: String,
        required: true
    }],
    shortDesc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

const Blog = mongoose.model.Blog || mongoose.model('Blog', blogSchema);

export default Blog
