import { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(data: { title: $title, body: $body }) {
      id
      title
      body
      published
    }
  }
`;

function CreatePostPage() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const navigate = useNavigate();

  const [createPostMutation] = useMutation(CREATE_POST);

  const submitHandler = (e) => {
    e.preventDefault();
    createPostMutation({
      variables: {
        title: titleRef.current.value,
        body: bodyRef.current.value,
      },
    })
      .then(() => {
        navigate("/posts");
      })
      .catch(console.error);
  };

  return (
    <>
      <div className="row">
        <div className="col-8 offset-2">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Create Post</h3>
              <form onSubmit={submitHandler}>
                {/* title */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    placeholder=""
                    ref={titleRef}
                  />
                  <label htmlFor="title">Title:</label>
                </div>

                {/* body */}
                <div className="mb-3">
                  <label htmlFor="" className="form-label"></label>
                  <textarea
                    className="form-control"
                    name=""
                    id=""
                    rows="3"
                    ref={bodyRef}
                  ></textarea>
                </div>

                <div className="row">
                  {/* button - submit */}
                  <div className="col-6">
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Create Post
                      </button>
                    </div>
                  </div>
                  {/* button - reset */}
                  <div className="col-6">
                    <div className="d-grid">
                      <button className="btn btn-secondary">Reset</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePostPage;
