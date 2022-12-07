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

console.log(favouriteBlog([]))

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}