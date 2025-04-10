import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const FETCH_POSTS = gql`
  query FetchPosts {
    posts {
      id
      title
      body
      published
      author {
        name
        age
        email
        role
      }
    }
  }
`;

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      token
    }
  }
`;

window.onload = function () {
  const listContainer = document.querySelector("#list-container");

  const fetchPosts = () => {
    client
      .query({
        query: FETCH_POSTS,
      })
      .then(({ data }) => {
        data.posts.forEach((post) => {
          const liElement = document.createElement("li");
          liElement.innerHTML = `
            <h4> ${post.title.toUpperCase()}</h4>
          <p>by ${post.author.name}</p>
          `;
          listContainer.appendChild(liElement);
        });
      })
      .catch(console.error);
  };

  fetchPosts();

  // Login
  const emailEl = document.getElementById("txtEmail");
  const passwordEl = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");

  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    client
      .mutate({
        mutation: SIGN_IN_MUTATION,
        variables: {
          email: emailEl.value,
          password: passwordEl.value,
        },
      })
      .then(({ data }) => {
        console.log("RESPONSE : ", data);
      })
      .catch(console.error);
  });
};
