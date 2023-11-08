import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {

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
      await login(loginData);
      setLoginData(initialLoginData);
      navigate("/users");
    } catch (err) {
      setError(err[0].message);
    }
  }

  return (
    <div className="text-center pt-10">
      <form onSubmit={handleSubmit} className="bg-emerald-100 w-fit ml-auto mr-auto px-4 py-4 rounded-lg">
        <div>
          <label className="mb-1">Username</label>
          <div>
            <input name="username"
              required
              value={loginData.username}
              onChange={handleChange}
              type="text"
              maxLength={20}
              className="bg-emerald-300 mb-2 rounded-lg px-2 py-1"
            />
          </div>
        </div>
        <div>
          <label className="mb-1">Password</label>
          <div>
            <input name="password"
              required
              value={loginData.password}
              onChange={handleChange}
              type="password"
              minLength={5}
              maxLength={20}
              className="bg-emerald-300 rounded-lg px-2 py-1"
            />
          </div>
        </div>
        {error && <p className="mt-4 text-red-400 font-bold">{error}</p>}
        <button className="bg-emerald-300 mt-4 px-3 py-1 rounded-lg">Login</button>
      </form>
    </div>

  );
}

export default LoginForm;