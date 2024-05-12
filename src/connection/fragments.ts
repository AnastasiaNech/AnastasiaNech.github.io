import { gql } from '@apollo/client';

export const SING_IN = gql`
  mutation ($password: String!, $email: String!) {
    profile {
      signin(password: $password, email: $email) {
        token
      }
    }
  }
`;

export const SING_UP = gql`
  mutation ($commandId: String!, $password: String!, $email: String!) {
    profile {
      signup(commandId: $commandId, password: $password, email: $email) {
        token
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query getProfile {
    profile {
      id
      name
      email
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation ($input: UpdateProfileInput!) {
    profile {
      update(input: $input) {
        id
        email
        name
        signUpDate
      }
    }
  }
`;

export const GET_OPERATIONS = gql`
  query {
    operations {
      getMany {
        data {
          ... on Cost {
            id
            name
            desc
            date
            createdAt
            updatedAt
            amount
            type
            category {
              createdAt
              id
              name
              photo
              updatedAt
            }
          }
          ... on Profit {
            id
            name
            desc
            date
            createdAt
            updatedAt
            amount
            type
            category {
              createdAt
              id
              name
              photo
              updatedAt
            }
          }
        }
        pagination {
          pageNumber
          pageSize
          total
        }
        sorting {
          field
          type
        }
      }
    }
  }
`;


export const GET_CATEGORIES = gql`
  query {
    categories {
      getMany {
        data {
          id
          name
          photo
          createdAt
          updatedAt
        }
        pagination {
          pageNumber
          pageSize
          total
        }
        sorting {
          field
          type
        }
      }
    }
  }
`;

export const ADD_OPERATIONS = gql`
  mutation ($input: OperationAddInput!) {
    operations {
      add(input: $input) {
        ... on Cost {
          id
          name
          desc
          date
          createdAt
          updatedAt
          amount
          category {
            createdAt
            id
            name
            photo
            updatedAt
          }
          type
        }
        ... on Profit {
          id
          name
          desc
          date
          createdAt
          updatedAt
          amount
          category {
            createdAt
            id
            name
            photo
            updatedAt
          }
          type
        }
      }
    }
  }
`;



export const UPDATE_OPERATIONS = gql`
  mutation ($input: OperationUpdateInput!, $id: ID!) {
    operations {
      put(input: $input, id: $id) {
        ... on Cost {
          name
          desc
          date
          createdAt
          updatedAt
          amount
          category {
            createdAt
            id
            name
            photo
            updatedAt
          }
          type
        }
        ... on Profit {
          name
          desc
          date
          createdAt
          updatedAt
          amount
          category {
            createdAt
            id
            name
            photo
            updatedAt
          }
          type
        }
      }
    }
  }
  `;

