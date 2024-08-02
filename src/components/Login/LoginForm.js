import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./LoginForm.css";
import Nav from "../Nav/Nav";

/** Form to log in. */
function LoginForm({ login }) {

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
      <Nav className="Login-Nav" />
      <div className="LoginForm">
        <div>
          <div>
            <p className="tagline">Oh hey.</p>
            <p className="tagline-sub">We missed you.</p>
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
              <div className="Buttons">
                <Link className="GoToRegister" to="/register">I don't have an account</Link>
                <button className="continue">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}

export default LoginForm;