import { gql } from "@apollo/client";

const USER_SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      token
    }
  }
`;

export default USER_SIGN_IN;
