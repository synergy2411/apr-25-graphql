/* eslint-disable no-undef */
const {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
} = require("@apollo/client");
const fetch = require("cross-fetch");

describe("GraphQL API Testing", () => {
  let client = null;

  beforeEach(() => {
    client = new ApolloClient({
      link: new HttpLink({
        uri: "http://localhost:4000/graphql",
        fetch,
      }),
      cache: new InMemoryCache(),
    });
  });

  afterEach(() => {
    client = null;
  });

  test("should fetch all posts from GraphQL Server", async () => {
    const FETCH_POSTS = gql`
      query fetchPosts {
        posts {
          id
          title
          body
          published
        }
      }
    `;

    const { data } = await client.query({
      query: FETCH_POSTS,
    });

    //   expect(data).not.toBeUndefined();
    expect(data.posts.length).not.toEqual(0);
  });

  test("should generate JWT token when correct credentials are supplied", async () => {
    const USER_SIGN_IN = gql`
      mutation SignIn {
        signIn(data: { email: "ross@test.com", password: "ross123" }) {
          token
        }
      }
    `;

    const { data } = await client.mutate({
      mutation: USER_SIGN_IN,
    });

    //   expect(data).not.toBeUndefined();
    expect(data.signIn.token).not.toBeUndefined();
  });
});
