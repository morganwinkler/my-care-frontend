import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        setSignupSuccess(true);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
    setTimeout(() => {
      setSignupSuccess(false);
    }, 3000);
  };

  return (
    <div id="signup">
      {signupSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> New user created.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
        </div>
      )}
      <div
        className="card shadow-xl shadow-cyan-500/50"
        style={{ paddingTop: "50px", paddingLeft: "100px", paddingRight: "100px" }}
      >
        <div className="prose ">
          <h1>Sign Up</h1>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>

          <form onSubmit={handleSubmit}>
            <div>
              Name:{" "}
              <input className="input input-bordered input-accent" style={{ margin: "10px" }} name="name" type="text" />
            </div>
            <div>
              Email:{" "}
              <input
                className="input input-bordered input-accent"
                style={{ margin: "10px" }}
                name="email"
                type="email"
              />
            </div>
            <div>
              Password:{" "}
              <input
                className="input input-bordered input-accent"
                style={{ margin: "10px" }}
                name="password"
                type="password"
              />
            </div>
            <div>
              Password confirmation:{" "}
              <input
                className="input input-bordered input-accent"
                style={{ margin: "10px" }}
                name="password_confirmation"
                type="password"
              />
            </div>
            <div className="text-center" style={{ margin: "20px" }}>
              <button className="btn btn-accent btn-lg" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
