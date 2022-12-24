const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const api = supertest(app)
jest.setTimeout(30000)

describe('testing username and password validation', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test(
        'creation fails with proper statuscode and message if username or password is not atleast three characters',
        async () => {
            const usersAtStart = await helper.usersInDb()
            const invalidUser = {
                    username: 'us',
                    name: 'name',
                    password: '12'
                }

            const result = await api
                .post('/api/users')
                .send(invalidUser)
                .expect(403)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain(
                'Both the username and password should be at least three characters'
            )

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
        })

    afterAll(() => {
        mongoose.connection.close()
    })
})