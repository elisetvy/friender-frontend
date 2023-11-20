import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
      <Link to="/" className="absolute text-center w-screen top-10 font-white font-bold tracking-widest text-xl hover:text-[#E64398]">LOVE NOTES</Link>
      <div className="background-white w-1/3 flex flex-col justify-center items-center text-center px-14 py-10 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col text-left w-full">
          <p className="text-xl font-bold font-fuschia text-center">Oh hey.</p>
          <p className="text-sm font-fuschia text-center">We missed you.</p>
            <div className="mt-3">
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
          {error && <p className="mt-3 bg-red-400 font-white font-bold text-center text-sm px-3 py-1 rounded-lg">{error}</p>}
          <div className="flex justify-end gap-2 mt-3">
            <Link className="font-white background-purple px-3 py-1 rounded-lg hover:scale-105 text-sm" to="/register">I don't have an account</Link>
            <button className="background-fuschia font-white w-fit px-3 py-1 rounded-lg hover:scale-105 text-sm">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;