const router = require('express').Router()
const Comment = require('../models/comment')

router.get('/:id', async (request, response) => {
  const comments = await Comment.find({blog: request.params.id})
  response.json(comments)
})

router.post('/:id', async (request, response) => {
  const comment = new Comment(request.body)
  const savedComment = await comment.save()
  response.status(201).json(savedComment)
})

module.exports = router