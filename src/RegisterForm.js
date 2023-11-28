import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import calculateAge from "./utils";

import FrienderApi from "./api";

/** Form to register a user. */
function RegisterForm({ register }){

  const navigate = useNavigate();

  const initialFormData = {username: "",
                          password: "",
                          name: "",
                          email: "",
                          dob: "",
                          photo: "",
                          zip: "",
                          radius: "",
                          bio: "",
                          }

  const [form, setForm] = useState("one");
  const [formData, setFormData]= useState(initialFormData);
  const [error, setError] = useState(null);
  const [emails, setEmails] = useState(null);

  /** Get users and user emails on mount.. */
  useEffect(function getUsersOnMount() {
    async function getUsers() {
      const users = await FrienderApi.getUsers();
      const emails = users.map(user => user.email);
      setEmails(emails);
    }
    getUsers();
  }, []);

  /** Check if username is already taken. */
  async function checkOne(e) {
    e.preventDefault();

    try {
      await FrienderApi.getUser(formData.username);
      setError(`User already exists: ${formData.username}`);
    } catch(err) {
      setError(null);
      setForm("two");
    }
  }

  /** Check user's age and if email is already taken. */
  async function checkTwo(e) {
    e.preventDefault();

    if (calculateAge(formData.dob) < 18) {
      setError("You must be at least 18 years old to register!");
    } else if (emails.includes(formData.email)) {
      setError("This email address is already associated with a user!");
    } else {
      setError(null);
      setForm("three");
    }
  }

  /** Update state with form data. */
  function handleChange(e) {
    const {name, value, files} = e.target;

    if (name !== "photo"){
      setFormData( f => ({...f, [name]: value}));
    } else {
      setFormData( f => ({...f, [name]: files[0]}));
    }
  }

  /** Call register function with form data. */
  async function handleSubmit(evt){
    evt.preventDefault();

    try {
      await register(formData);
      navigate("/users");
    } catch(err) {
      setError(err[0].message);
    }
  }

  return(
    <div className="absolute top-0 left-0 w-screen h-screen">
      <Link to="/" className="absolute text-center w-screen top-10 font-white font-bold tracking-widest text-xl hover:text-[#E64398]">LOVE NOTES</Link>
      <div className="w-full h-full flex justify-center items-center">
        <div className="background-white min-w-[385px] w-2/5 flex flex-col justify-center items-center text-center px-14 py-10 rounded-lg">
          { form === "one" &&
          <>
          <p className="text-xl font-bold font-fuschia">Be the author of your own love story.</p>
          <p className="text-sm font-fuschia">Choose a username and password to begin.</p>
          <form onSubmit={checkOne} className="mt-4 flex flex-col text-left w-full">
            <label className="mb-1 font-purple font-bold">Username</label>
            <input name="username"
                required
                value={formData.username}
                onChange={handleChange}
                type="text"
                maxLength={20}
                className="mb-2 rounded-lg px-2 py-1 font-fuschia"
                />
            <label className="mb-1 font-purple font-bold">Password</label>
            <input name="password"
                required
                value={formData.password}
                onChange={handleChange}
                type="password"
                autoComplete="off"
                minLength={5}
                maxLength={100}
                className="mb-3 rounded-lg px-2 py-1 font-fuschia"
                />
            {error && <p className="mb-3 bg-red-400 font-white text-center text-sm px-3 py-1 rounded-lg">{error}</p>}
            <div className="flex gap-2 justify-end">
            <Link className="font-white background-purple px-3 py-1 rounded-lg hover:scale-105 text-sm text-center" to="/login">I already have an account</Link>
            <button className="font-white background-fuschia w-fit px-3 py-1 text-xsxs rounded-lg hover:scale-105 text-center">Continue <i className="bi bi-arrow-right"></i></button>
            </div>
          </form>
          <div className="mt-4 flex gap-2">
            <i className="bi bi-circle-fill font-fuschia text-[8px]"></i>
            <i className="bi bi-circle-fill text-white text-[8px]"></i>
            <i className="bi bi-circle-fill text-white text-[8px]"></i>
            <i className="bi bi-circle-fill text-white text-[8px]"></i>
          </div>
          </>
        }
        { form === "two" &&
        <>
        <form onSubmit={checkTwo} className="mt-4 flex flex-col text-left w-full">
          <label className="mb-1 font-purple font-bold">Name</label>
          <input name="name"
                required
                value={formData.name}
                onChange={handleChange}
                type="text"
                maxLength={20}
                className="mb-2 rounded-lg px-2 py-1 font-fuschia"
                />
          <label className="mb-1 font-purple font-bold">Email Address</label>
          <input name="email"
                required
                value={formData.email}
                onChange={handleChange}
                type="email"
                maxLength={50}
                className="mb-2 rounded-lg px-2 py-1 font-fuschia"
                />
          <label className="mb-1 font-purple font-bold">Date of Birth</label>
          <input name="dob"
            required
            value={formData.dob}
            onChange={handleChange}
            type="date"
            className="mb-3 rounded-lg px-2 py-1 font-fuschia"
            />
          {error && <p className="mb-3 bg-red-400 font-white text-center text-sm px-3 py-1 rounded-lg">{error}</p>}
          <div className="flex justify-end">
          <button className="background-fuschia font-white w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Continue <i className="bi bi-arrow-right"></i></button>
          </div>
        </form>
        <div className="mt-4 flex gap-2">
          <i onClick={(e) => { e.preventDefault(); setForm("one"); setError(null); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
          <i className="bi bi-circle-fill font-fuschia text-[8px]"></i>
          <i className="bi bi-circle-fill text-white text-[8px]"></i>
          <i className="bi bi-circle-fill text-white text-[8px]"></i>
        </div>
        </>
        }
        { form === "three" &&
        <>
          <form onSubmit={(e) => { e.preventDefault(); setForm("four"); }} className="mt-4 flex flex-col text-left w-full">
            <label className="mb-1 font-purple font-bold">ZIP Code</label>
            <input name="zip"
              required
              value={formData.zip}
              onChange={handleChange}
              pattern="[0-9]{5}"
              minLength={5}
              maxLength={5}
              className="mb-2 rounded-lg px-2 py-1 font-fuschia"
              />
            <label className="mb-1 font-purple font-bold">Match Radius</label>
            <input name="radius"
              value={formData.radius}
              onChange={handleChange}
              pattern="[0-9]{0,}"
              type="text"
              className="mb-3 rounded-lg px-2 py-1 font-fuschia"
              />
            {error && <p className="mb-3 bg-red-400 font-white text-center text-sm px-3 py-1 rounded-lg">{error}</p>}
            <div className="flex justify-end">
            <button className="background-fuschia font-white w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Continue <i className="bi bi-arrow-right"></i></button>
            </div>
          </form>
          <div className="mt-4 flex gap-2">
          <i onClick={(e) => { e.preventDefault(); setForm("one"); setError(null); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
          <i onClick={(e) => { e.preventDefault(); setForm("two"); setError(null); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
          <i className="bi bi-circle-fill font-fuschia text-[8px]"></i>
          <i className="bi bi-circle-fill text-white text-[8px]"></i>
          </div>
        </>
        }
        { form === "four" &&
        <>
          <form className="mt-4 flex flex-col text-left w-full">
            <label className="mb-1 font-purple font-bold">Profile Photo</label>
              <input name="photo"
                onChange={handleChange}
                type="file"
                accept="image/*"
                className="mb-2 rounded-lg px-2 py-1 font-fuschia file:hover:scale-105 file:hover:cursor-pointer file:border-none file:bg-[#E64398] file:text-[#F0EBF4] file:px-2 file:py-1 file:text-sm file:rounded-lg file:mr-3"
                />
            <label className="mb-1 font-purple font-bold">Bio</label>
            <input name="bio"
                value={formData.bio}
                onChange={handleChange}
                type="text"
                className="mb-3 rounded-lg px-2 py-1 font-fuschia"
                />
            {error && <p className="mb-3 bg-red-400 font-white text-center text-sm px-3 py-1 rounded-lg">{error}</p>}
            <div className="flex justify-end">
            <button onClick={handleSubmit} className="background-fuschia font-white w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Submit</button>
            </div>
          </form>
          <div className="mt-4 flex gap-2">
          <i onClick={(e) => { e.preventDefault(); setForm("one"); setError(null); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
          <i onClick={(e) => { e.preventDefault(); setForm("two"); setError(null); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
          <i onClick={(e) => { e.preventDefault(); setForm("three"); setError(null); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
          <i className="bi bi-circle-fill font-fuschia text-[8px]"></i>
          </div>
        </>
        }
        </div>
      </div>
    </div>
  )
}

export default RegisterForm;