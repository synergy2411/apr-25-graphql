function LoginPage() {
  return (
    <>
      <div className="row">
        <div className="col-8 offset-2">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Login Form</h3>
              <form>
                {/* email */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder=""
                  />
                  <label htmlFor="email">Email:</label>
                </div>

                {/* password */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder=""
                  />
                  <label htmlFor="password">Password</label>
                </div>

                {/* button */}
                <div className="row">
                  <div className="col-6">
                    <div className="d-grid">
                      <button className="btn btn-primary">Login</button>
                    </div>
                  </div>
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

export default LoginPage;
