import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Nav from "../Nav/Nav";

import "./Login.css";

/** Form to log in. */
function Login({ login }) {

  const navigate = useNavigate();

  const initialLoginData = {
    username: "",
    password: ""
  };

  const [loginData, setLoginData] = useState(initialLoginData);
  const [error, setError] = useState(null);

  /** Update state with form data. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginData(f => ({ ...f, [name]: value }));

  }

  /** Call login function with credentials. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await login(loginData);
      setLoginData(initialLoginData);
      navigate("/users");
    } catch (err) {
      setError(err[0].message);
    }
  }

  return (
    <div>
      <div className="Login-Nav">
        <Nav />
      </div>
      <div className="Login">
        <div className="Login-Form">
            <p>Oh hey.</p>
            <p>We missed you.</p>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input name="username"
                required
                value={loginData.username}
                onChange={handleChange}
                type="text"
                maxLength={20}
              />
              <label>Password</label>
              <input name="password"
                required
                value={loginData.password}
                onChange={handleChange}
                type="password"
                minLength={5}
                maxLength={20}
              />
              {error && <p className="error">{error}</p>}
              <div className="buttons">
                <Link className="goToRegister" to="/register">I don't have an account</Link>
                <button className="continue">Log In</button>
              </div>
            </form>
        </div>
      </div>
    </div>

  );
}

export default Login;