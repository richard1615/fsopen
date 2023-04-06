const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require ('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const {GraphQLError} = require("graphql/error");

const MONGODB_URI = process.env.MONGODB_URI

const PASSWORD = 'secret'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Author {
    name: String!
    born: Int
    bookCount: String!
  }
  
  type Book {
    title: String!
    published: Int!
    author: String!
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
    createUser(
    username: String!
    favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    id: ID!
    me: User  
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = {};
      if (args.author) {
        query.author = args.author;
      }
      if (args.genre) {
        query.genres = {$in: args.genre};
      }
      const book = await Book.find(query).populate('author')
      console.log(book)
      return book.map(b => ({
        title: b.title,
        published: b.published,
        author: b.author.name,
        genres: b.genres
      }))
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map(a => ({
          name: a.name,
          born: a.born? a.born : null,
          bookCount: books.filter(b => b.author === a.name).length
        })
      )}
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({name: args.author})
      let savedAuthor = null
      if (!author) {
        const newAuthor = new Author({name: args.author})
        try {
          savedAuthor = await newAuthor.save()
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args,
              error
            }
          })
        }
      }
      const book = new Book({...args, author: savedAuthor? savedAuthor.id : author.id})
      try {
        const savedBook = await (await book.save()).populate('author')
        return {...savedBook, author: savedBook.author.name}
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error
          }
        })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      author.born = args.setBornTo
      try {
        return author.save()
      } catch(error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args,
            error
          }
        })
      }
    }
  }
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