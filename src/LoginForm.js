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
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div className="background-white w-1/3 flex flex-col justify-center items-center text-center px-14 py-10 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col text-left w-full">
          <p className="text-xl font-bold font-fuschia text-center">Welcome back!</p>
            <div className="mt-4">
            <label className="mb-1 font-purple font-bold">Username</label>
              <input name="username"
                required
                value={loginData.username}
                onChange={handleChange}
                type="text"
                maxLength={20}
                className="mb-2 rounded-lg px-2 py-1 font-fuschia w-full"
              />
            <label className="mb-1 font-purple font-bold">Password</label>
              <input name="password"
                required
                value={loginData.password}
                onChange={handleChange}
                type="password"
                minLength={5}
                maxLength={20}
                className="rounded-lg px-2 py-1 font-fuschia w-full"
              />
          </div>
          {error && <p className="mt-4 text-red-400 font-bold">{error}</p>}
          <div className="flex justify-center">
            <button className="background-fuschia font-white w-fit mt-4 px-3 py-1 rounded-lg hover:scale-105 text-sm">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;