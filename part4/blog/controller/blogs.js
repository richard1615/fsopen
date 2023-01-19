const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
	const notes = await Blog
		.find({})
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(notes)
})

router.get('/:id', async (request, response) => {
	const blog = await Blog
		.findById(request.params.id)
		.populate('user', { username: 1, name: 1 })
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

router.post('/', async (request, response) => {
	if (!request.user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const user = request.user
	const blog = new Blog({ ...request.body, user: user.id })

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
	const blogToDelete = await Blog.findById(request.params.id)
	if (!request.user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	if (!blogToDelete ) {
		return response.status(204).end()
	}

	if ( blogToDelete.user && blogToDelete.user.toString() !== request.user.id ) {
		return response.status(401).json({
			error: 'only the creator can delete a blog'
		})
	}

	await Blog.findByIdAndRemove(request.params.id)

	response.status(204).end()
})

router.put('/:id', async (request, response) => {
	const blog = request.body
	const blogToUpdate = await Blog.findById(request.params.id)
	if (!blogToUpdate ) {
		return response.status(204).end()
	}
	if (!request.user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	console.log(request.params.id)
	const updatedBlog = await Blog
		.findByIdAndUpdate(
			request.params.id.trim(),
			blog,
			{ new: true, runValidators: true, context: 'query' }
		)

	response.json(updatedBlog)
})

module.exports = router