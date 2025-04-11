import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import USER_SIGN_IN from "../../apollo/user-login";
import AuthContext from "../../context/auth-context";

function LoginPage() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  let [signInMutation, { error, loading }] = useMutation(USER_SIGN_IN);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(enteredEmail, enteredPassword);
    signInMutation({
      variables: {
        email: enteredEmail,
        password: enteredPassword,
      },
    })
      .then((response) => {
        context.setIsLoggedIn(true);
        context.token = response.data.signIn.token;
        localStorage.setItem("token", response.data.signIn.token);
        navigate("/posts");
      })
      .catch(console.error);
  };

  const resetHandler = () => {
    localStorage.clear();
    setEnteredEmail("");
    setEnteredPassword("");
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-8 offset-2">
          <div className="card">
            <div className="card-body">
              <h3 className="text-center">Login Form</h3>
              <form onSubmit={submitHandler}>
                {error && <p className="alert alert-danger">{error.message}</p>}
                {/* email */}
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder=""
                    value={enteredEmail}
                    onChange={(e) => setEnteredEmail(e.target.value)}
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
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </div>

                {/* button */}
                <div className="row">
                  <div className="col-6">
                    <div className="d-grid">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Login"}
                      </button>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-grid">
                      <button
                        className="btn btn-secondary"
                        onClick={resetHandler}
                      >
                        Reset
                      </button>
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
