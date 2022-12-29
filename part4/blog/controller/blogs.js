const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    }
    else {
        response.status(404).end()
    }
})

const getToken = (request) => {
    const authorisation = request.get('authorisation')
    console.log(authorisation)
    if(authorisation && authorisation.toLowerCase().startsWith('bearer')){
        return authorisation.substring(7)
    }
    return null
}

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken){
        return response
            .status(401)
            .json({error: "Invalid or missing token"})
            .end()
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

module.exports = blogsRouter