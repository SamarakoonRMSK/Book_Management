import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks($filter: String, $limit: Int, $offset: Int) {
    books(filter: $filter, limit: $limit, offset: $offset) {
      totalCount
      books {
        id
        title
        author
        publishedYear
        genre
      }
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      publishedYear
      genre
    }
  }
`;
