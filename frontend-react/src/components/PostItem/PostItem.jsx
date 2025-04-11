function PostItem({ post }) {
  return (
    <>
      <div className="col-4 mb-4">
        <div className="card">
          <div className="card-header">
            <h6 className="text-center">{post.title.toUpperCase()}</h6>
          </div>
          <div className="card-body">
            <p>
              {post.body}
              <span className="float-end">
                - {post.author.name.toUpperCase()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostItem;
