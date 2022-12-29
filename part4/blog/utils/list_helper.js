const _ = require('lodash')
const dummy = (blogs) => {
	return 1
}
const totalLikes = (blogs) => blogs.reduce((total, currentBlog) => total + currentBlog.likes, 0)

const favouriteBlog = (blogs) => {
	if (blogs.length) {
		return blogs.reduce((prev, current) => current.likes > prev.likes?current:prev)
	}
	return NaN
}

const mostLikes = (blogs) => {
	let authorLikes = blogs.reduce((op, {author, likes}) => {
		op[author] = op[author] || 0
		op[author] += likes
		return op
	},{})

	authorLikes = _.toPairs(authorLikes)
	const result = _.maxBy(authorLikes, (a) => a[1])
	return {
		author: result[0],
		likes: result[1]
	}
}


const mostBlogs = (blogs) => {
	let authorLikes = blogs.reduce((op, {author}) => {
		op[author] = op[author] || 0
		op[author] += 1
		return op
	},{})

	authorLikes = _.toPairs(authorLikes)
	const result = _.maxBy(authorLikes, (a) => a[1])
	return {
		author: result[0],
		blogs: result[1]
	}
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog
}