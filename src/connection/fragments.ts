
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


