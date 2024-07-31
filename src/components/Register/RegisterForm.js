import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Nav from "../../Nav";
import "./RegisterForm.css";
import calculateAge from "../../utils";
import FrienderApi from "../../api";

/** Form to register a user. */
function RegisterForm({ register }) {

  const navigate = useNavigate();

  const initialFormData = {
    username: "",
    password: "",
    name: "",
    email: "",
    dob: "",
    photo: "",
    zip: "",
    radius: "",
    bio: "",
  };

  const [form, setForm] = useState("one");
  const [formData, setFormData] = useState(initialFormData);
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
    } catch (err) {
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
    const { name, value, files } = e.target;

    if (name !== "photo") {
      setFormData(f => ({ ...f, [name]: value }));
    } else {
      setFormData(f => ({ ...f, [name]: files[0] }));
    }
  }

  /** Call register function with form data. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await register(formData);
      navigate("/users");
    } catch (err) {
      setError(err[0].message);
    }
  }

  return (
    <div className="RegisterForm">
      {/* <Nav /> */}
      <div>
        <div>
          {form === "one" &&
            <>
              <p className="tagline">Be the author of your own love story.</p>
              <p className="instructions">Choose a username and password to begin.</p>
              <form onSubmit={checkOne}>
                <label>Username</label>
                <input name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  maxLength={20}
                />
                <label>Password</label>
                <input name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  autoComplete="off"
                  minLength={5}
                  maxLength={100}
                />
                {error && <p className="error">{error}</p>}
                <div className="flex gap-2 justify-end">
                  <Link className="GoToLogin" to="/login">I already have an account</Link>
                  <button className="continue">Continue <i className="bi bi-arrow-right"></i></button>
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
          {form === "two" &&
            <>
              <form onSubmit={checkTwo}>
                <label>Name</label>
                <input name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  maxLength={20}
                />
                <label>Email Address</label>
                <input name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  maxLength={50}
                />
                <label>Date of Birth</label>
                <input name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  type="date"
                />
                {error && <p className="error">{error}</p>}
                <div className="flex justify-end">
                  <button className="continue">Continue <i className="bi bi-arrow-right"></i></button>
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
          {form === "three" &&
            <>
              <form onSubmit={(e) => { e.preventDefault(); setForm("four"); }}>
                <label>ZIP Code</label>
                <input name="zip"
                  required
                  value={formData.zip}
                  onChange={handleChange}
                  pattern="[0-9]{5}"
                  minLength={5}
                  maxLength={5}
                />
                <label>Match Radius</label>
                <input name="radius"
                  value={formData.radius}
                  onChange={handleChange}
                  pattern="[0-9]{0,}"
                  type="text"
                />
                {error && <p className="error">{error}</p>}
                <div className="flex justify-end">
                  <button className="continue">Continue <i className="bi bi-arrow-right"></i></button>
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
          {form === "four" &&
            <>
              <form>
                <label>Profile Photo</label>
                <input name="photo"
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                />
                <label>Bio</label>
                <input name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  type="text"
                />
                {error && <p className="error">{error}</p>}
                <div className="flex justify-end">
                  <button onClick={handleSubmit} className="continue">Submit</button>
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
  );
}

export default RegisterForm;