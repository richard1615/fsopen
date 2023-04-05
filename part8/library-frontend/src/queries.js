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