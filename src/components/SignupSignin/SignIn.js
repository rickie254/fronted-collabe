import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import sign from "./sign.css"

function SignIn({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
 const navigate = useNavigate();


 





  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://[::1]:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {

        r.json().then((data) => {
          setUser(data.user)
          localStorage.setItem('token',data.jwt);
        navigate("/user")
        });
        

      } else setMsg("Invalid Username or Password");
    });
  }

  return (
    <div className="form_container ">
      {/* Labels and inputs for form data */}
      {/* <label  for="membership">Admin/User:</label> */}
      <select className="form-field" name="membership" id="membership"  onChange={(e)=>(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <form className="form_login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* <label htmlFor="username">Username</label> */}
        <input className="inpt"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {/* <label htmlFor="password">Password</label> */}
        <input className="inpt"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {msg ? (
          <div className="error-msg">
            <h5 className="error-text">Invalid username or password!!.</h5>
          </div>
        ) : // <h6><a href="">forgot password</a></h6>
        null}
        <button className="btn" type="submit">
          Login
        </button>
      
      </form>
    </div>
  );
}

export default SignIn;
