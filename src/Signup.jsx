import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
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
