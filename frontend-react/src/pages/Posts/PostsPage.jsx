import { gql, useQuery } from "@apollo/client";
import PostItem from "../../components/PostItem/PostItem";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  if (loading) return <h1>Loading....</h1>;

  return (
    <>
      <h1>The Blog App</h1>
      {error && <p>Something bad happened. Try again!</p>}

      <div className="row mb-4">
        <div className="offset-4 col-4">
          <div className="d-grid">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login Form
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {data &&
          data.posts.map((post) => <PostItem post={post} key={post.id} />)}
      </div>
    </>
  );
}

export default PostsPage;
