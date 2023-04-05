import { gql} from "@apollo/client";

export const GET_AlL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const GET_ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`