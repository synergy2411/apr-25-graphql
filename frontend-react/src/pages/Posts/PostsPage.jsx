import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { useNavigate } from "react-router";
import FETCH_POSTS from "../../apollo/fetch-posts";
import PostItem from "../../components/PostItem/PostItem";
import AuthContext from "../../context/auth-context";

function PostsPage() {
  const { data, loading, error, refetch } = useQuery(FETCH_POSTS);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  refetch();

  if (loading) return <h1>Loading....</h1>;

  return (
    <>
      <h1>The Blog App</h1>
      {error && <p>Something bad happened. Try again!</p>}

      <div className="row mb-4">
        <div className="offset-4 col-4">
          <div className="d-grid">
            {!context.isLoggedIn && (
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Login Form
              </button>
            )}
            {context.isLoggedIn && (
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/create-post")}
              >
                Create New Post
              </button>
            )}
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
