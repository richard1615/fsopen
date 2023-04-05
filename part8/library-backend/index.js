const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require ('dotenv').config()
import Book from './models/book'
import Author from './models/author'

const MONGODB_URI = process.env.MONGODB_URI


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: String!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    id: ID!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => books.filter(b =>
      (!args.author || b.author === args.author)
      && (!args.genre || b.genres.includes(args.genre))),
    allAuthors: () => {
      const authors = Author.find({})
      const books = Book.find({})
      return authors.map(a => ({
          name: a.name,
          born: a.born? a.born : null,
          bookCount: books.filter(b => b.author === a.name).length
        })
      )}
  },
  // Mutation: {
  //   addBook: (root, args) => {
  //     if (!authors.find(a => a.name === args.author)) {
  //       const author = {name: args.author, id: uuid()}
  //       authors = authors.concat(author)
  //     }
  //     const book = {...args, id: uuid()}
  //     books = books.concat(book)
  //     return book
  //   },
  //   editAuthor: (root, args) => {
  //     const authorIndex = authors.findIndex(a => a.name === args.name)
  //     console.log(authorIndex)
  //     if (authorIndex === -1){
  //       return null
  //     }
  //     authors[authorIndex].born = args.setBornTo
  //     return authors[authorIndex]
  //   }
  // }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: {port: 4000},
}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})