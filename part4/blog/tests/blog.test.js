const listHelper = require('../utils/list_helper')
const data = require('./data/data')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const mongoose = require('mongoose')

const api = supertest(app)
jest.setTimeout(30000)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(data.listWithManyBlogs)
})

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(data.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(data.listWithManyBlogs)
        expect(result).toBe(36)
    })
})

describe('favourite blog', () => {
    test('of empty list is None', () => {
        const result = listHelper.favouriteBlog([])
        expect(result).toEqual(NaN)
    })

    test('when list has only one blog, equals the blog itself', () => {
        const result = listHelper.favouriteBlog(data.listWithOneBlog)
        expect(result).toEqual({
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        })
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.favouriteBlog(data.listWithManyBlogs)
        expect(result).toEqual({
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        })
    })
})

describe('database operations: ', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(data.listWithManyBlogs.length)
    })

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[0]
        expect(blog.id).toBeDefined()
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            'title': 'Go To Statement Considered Harmful',
            'author': 'Edsger W. Dijkstra',
            'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            'likes': 5
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response =  await api.get('/api/blogs')
        const blogsAtEnd = response.body
        expect(blogsAtEnd).toHaveLength(data.listWithManyBlogs.length + 1)

        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain('Go To Statement Considered Harmful')
    })

    test(' if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            'title': 'Go To Statement Considered Harmful',
            'author': 'Edsger W. Dijkstra',
            'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        //blog is successfully added
        const response =  await api.get('/api/blogs')
        const blogsAtEnd = response.body
        expect(blogsAtEnd).toHaveLength(data.listWithManyBlogs.length + 1)
        // number of likes is zero
        const blog = await Blog.findOne({
            'title': 'Go To Statement Considered Harmful',
            'author': 'Edsger W. Dijkstra',
            'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        })
        expect(blog.likes).toBe(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
})