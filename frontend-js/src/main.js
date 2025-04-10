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
};
