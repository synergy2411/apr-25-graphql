function CreatePostPage() {
  return (
    <>
      <div className="row">
        <div className="col-8 offset-2">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Create Post</h3>
              <form>
                {/* title */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    id="title"
                    placeholder=""
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
                  ></textarea>
                </div>

                <div className="row">
                  {/* button - submit */}
                  <div className="col-6">
                    <div className="d-grid">
                      <button className="btn btn-primary">Create Post</button>
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
