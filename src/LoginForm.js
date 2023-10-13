import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ handleLogin }) {

  const navigate = useNavigate();

  const initialLoginData = {
    username: "",
    password: ""
  };

  const [loginData, setLoginData] = useState(initialLoginData);
  const [error, setError] = useState(null);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setLoginData(f => ({ ...f, [name]: value }));

  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await handleLogin(loginData);
      setLoginData(initialLoginData);
      navigate("/cats");
    } catch (err) {
      setError(err[0].message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <div>
            <input name="username"
              required
              value={loginData.username}
              onChange={handleChange}
              type="text"
              maxLength={20}
            />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input name="password"
              required
              value={loginData.password}
              onChange={handleChange}
              type="password"
              minLength={5}
              maxLength={20}
            />
          </div>
        </div>
        {error && <p>{error}</p>}
        <button>Login</button>
      </form>
    </div>

  );
}

export default LoginForm;