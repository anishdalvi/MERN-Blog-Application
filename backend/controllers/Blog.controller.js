const Blog = require('../models/Blog.model')
const User = require('../models/User.model')
const mongoose = require('mongoose')

exports.getAllBlogs = async (req, res, next) => {
    let blogs
    try {
        blogs = await Blog.find().populate('user').sort({updatedAt: -1})
    } catch (error) {
        return console.log(error)
    }
    if (!blogs){
        return res.status(404).json({message: 'No Blogs found'})
    }
    return res.status(200).json({blogs:blogs})
}


exports.addBlog = async (req, res, next) => {
    const { title, description, image, user} = req.body
    let existingUser
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        return console.log(error)
    }

    if(!existingUser) {
        return res.status(400).json({ message:"Unable to find user by this ID"})
    }

    const blog = new Blog({
        title, 
        description, 
        image, 
        user
    })

    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
    return res.status(200).json({blog})
}

exports.updateBlog = async (req, res, next) => {
    const { title, description, image} = req.body
    const blogID = req.params.id;
    let blog
    try {
        blog = await Blog.findByIdAndUpdate(blogID, {
            title, 
            description,
            image
        })
    } catch (error) {
        return console.log(error)
    }
    if (!blog){
        return res.status(500).json({message: 'Unable to update blog'})
    }
    return res.status(200).json({blog:blog})

}


exports.getById = async (req, res, next) => {
    const ID = req.params.id
    let blog
    try {
        blog = await Blog.findById(ID)
    } catch (error) {
        return console.log(error)
    }
    if (!blog){
        return res.status(404).json({message: 'No blog found'})
    }
    return res.status(200).json({blog:blog})
}

exports.deleteBlog = async (req, res, next) => {
    const ID = req.params.id
    let blog
    try {
        blog = await Blog.findByIdAndRemove(ID).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (error) {
        return console.log(error)
    }
    if (!blog){
        return res.status(500).json({message: 'Unable to delete blog'})
    }
    return res.status(200).json({message: 'Blog deleted'})
}
//.sort({updatedAt: -1})

exports.getByUserId = async (req, res, next) => {
    const userId = req.params.id
    let userBlogs
    try {
        userBlogs = await User.findById(userId).populate({path:'blogs',options:{ sort:{updatedAt : -1}}})
        //console.log(userBlogs)
    } catch (error) {
        return console.log(error)
    }
    if(!userBlogs){
        return res.status(404).json({message: 'No blogs found'})
    }
    return res.status(200).json({user: userBlogs})
}