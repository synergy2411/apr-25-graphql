import { gql, useQuery } from "@apollo/client";
import PostItem from "../../components/PostItem/PostItem";

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

function PostsPage() {
  const { data, loading, error } = useQuery(FETCH_POSTS);

  if (loading) return <h1>Loading....</h1>;

  return (
    <>
      <h1>The Blog App</h1>
      {error && <p>Something bad happened. Try again!</p>}
      <div className="row">
        {data &&
          data.posts.map((post) => <PostItem post={post} key={post.id} />)}
      </div>
    </>
  );
}

export default PostsPage;
