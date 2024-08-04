import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Nav from "../Nav/Nav";

import calculateAge from "../../utils";
import API from "../../api";

import "./Register.css";

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

  const [formPage, setFormPage] = useState("one");
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [emails, setEmails] = useState(null);

  /** Get users and user emails on mount.. */
  useEffect(function getUsersOnMount() {
    async function getUsers() {
      const users = await API.getUsers();
      const emails = users.map(user => user.email);
      setEmails(emails);
    }
    getUsers();
  }, []);

  /** Check if username is already taken. */
  async function checkUsername(e) {
    e.preventDefault();

    try {
      await API.getUser(formData.username);
      setError(`User already exists: ${formData.username}`);
    } catch (err) {
      setError(null);
      setFormPage("two");
    }
  }

  /** Check user's age and if email is already taken. */
  async function checkAgeAndEmail(e) {
    e.preventDefault();

    if (calculateAge(formData.dob) < 18) {
      setError("You must be at least 18 years old to register!");
    } else if (emails.includes(formData.email)) {
      setError("This email address is already associated with a user!");
    } else {
      setError(null);
      setFormPage("three");
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
    <div>
      <div className="Register-Nav">
        <Nav />
      </div>
      <div className="Register">
        <div className="Register-Form">
          <div>
            {formPage === "one" &&
              <>
                <p className="tagline">Be the author of your own love story.</p>
                <p className="instructions">Choose a username and password to begin.</p>
                <form onSubmit={checkUsername}>
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
                  <div className="buttons">
                    <Link className="goToLogin" to="/login">I already have an account</Link>
                    <button className="continue">Continue <i className="bi bi-arrow-right"></i></button>
                  </div>
                </form>
                <div className="pagination">
                  <i className="bi bi-circle-fill active"></i>
                  <i className="bi bi-circle-fill"></i>
                  <i className="bi bi-circle-fill"></i>
                  <i className="bi bi-circle-fill"></i>
                </div>
              </>
            }
            {formPage === "two" &&
              <>
                <form onSubmit={checkAgeAndEmail}>
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
                  <div className="buttons">
                    <button className="back" onClick={(e) => { e.preventDefault(); setFormPage("one"); }}>Back</button>
                    <button className="continue">Continue <i className="bi bi-arrow-right"></i></button>
                  </div>
                </form>
                <div className="pagination">
                  <i className="bi bi-circle-fill"></i>
                  <i className="bi bi-circle-fill active"></i>
                  <i className="bi bi-circle-fill"></i>
                  <i className="bi bi-circle-fill"></i>
                </div>
              </>
            }
            {formPage === "three" &&
              <>
                <form onSubmit={(e) => { e.preventDefault(); setFormPage("four"); }}>
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
                    pattern="[0-9]{0,}" // input can be empty
                    type="text"
                  />
                  {error && <p className="error">{error}</p>}
                  <div className="buttons">
                    <button className="back" onClick={(e) => { e.preventDefault(); setFormPage("two"); }}>Back</button>
                    <button className="continue">Continue <i className="bi bi-arrow-right"></i></button>
                  </div>
                </form>
                <div className="pagination">
                  <i className="bi bi-circle-fill"></i>
                  <i className="bi bi-circle-fill"></i>
                  <i className="bi bi-circle-fill active"></i>
                  <i className="bi bi-circle-fill"></i>
                </div>
              </>
            }
            {formPage === "four" &&
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
                  <div className="buttons">
                    <button className="back" onClick={(e) => { e.preventDefault(); setFormPage("three"); }}>Back</button>
                    <button onClick={handleSubmit} className="continue">Submit</button>
                  </div>
                </form>
                <div className="pagination">
                  <i className="bi bi-circle-fill"></i>
                  <i className="bi bi-circle-fill"></i>
                  <i className="bi bi-circle-fill"></i>
                  <i className="bi bi-circle-fill active"></i>
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;