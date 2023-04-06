const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require ('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const {GraphQLError} = require("graphql/error");
const jwt = require('jsonwebtoken')

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
      )},
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
      })}
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
        console.log(savedBook)
        return {
          title: savedBook.title,
          published: savedBook.published,
          author: savedBook.author.name,
          genres: savedBook.genres
        }
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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
      })}
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
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== PASSWORD ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
    },}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})