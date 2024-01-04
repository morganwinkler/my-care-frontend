import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div id="login">
      <div
        className="card shadow-xl shadow-cyan-500/50"
        style={{ paddingTop: "50px", paddingLeft: "100px", paddingRight: "100px", marginLeft: "50px" }}
      >
        <div className="prose">
          <h1>Login</h1>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <div>
              Email:{" "}
              <input
                name="email"
                className="input input-bordered input-accent"
                style={{ margin: "10px" }}
                type="email"
              />
            </div>
            <div>
              Password:{" "}
              <input
                name="password"
                className="input input-bordered input-accent"
                style={{ margin: "10px" }}
                type="password"
              />
            </div>
            <div className="text-center" style={{ margin: "20px" }}>
              <button className="btn btn-accent btn-lg" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
