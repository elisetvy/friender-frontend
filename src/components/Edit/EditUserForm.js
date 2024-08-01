import { useState } from "react";
import { Link } from "react-router-dom";

import "./EditUserForm.css";
import API from "../../api";

/** Form to edit user info. */
function EditUserForm({ currUser, update }) {
  const initialFormData = {
    username: currUser.username,
    password: "",
    name: currUser.name,
    email: currUser.email,
    zip: currUser.zip,
    radius: currUser.radius,
    // photo: currUser.photo,
    bio: currUser.bio,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  /** Update state with form data. */
  function handleChange(evt) {
    const { name, value, files } = evt.target;

    if (name !== "photo") {
      setFormData(f => ({ ...f, [name]: value }));
    } else {
      setFormData(f => ({ ...f, [name]: files[0] }));
    }
  }

  /** Call update function with form data. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    // Duplicate check
    if (formData.username !== currUser.username) {
      try {
        await API.getUser(formData.username);
        setError(`User already exists: ${formData.username}`);
        return;
      } catch (err) {
      }
    }

    try {
      await update(currUser.username, formData);
      if (error !== null) setError(null);
      setAlert('Your changes have been saved.');
    } catch (err) {
      setAlert(null);
      setError(err[0].message);
    }
  }

  return (
    <div className="EditUserForm">
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="section">
            <div>
              <label>Username</label>
              <input name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                maxLength={20}
                className="disabled"
                disabled
              />
            </div>
            <div>
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
            </div>
          </div>
          <div className="section">
            <div>
              <label>Name</label>
              <input name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                maxLength={20}
              />
            </div>
            <div>
              <label>Email</label>
              <input name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                maxLength={50}
              />
            </div>
          </div>
          <div className="section">
            <div>
              <label>Date of Birth</label>
              <input name="dob"
                value={currUser.dob}
                onChange={handleChange}
                type="date"
                className="disabled"
                disabled
              />
            </div>
            <div>
              <label>ZIP Code</label>
              <input name="zip"
                value={formData.zip}
                onChange={handleChange}
                type="text"
                pattern="[0-9]{5}"
                minLength={5}
                maxLength={5}
              />
            </div>
            <div>
              <label>Match Radius</label>
              <input name="radius"
                value={formData.radius}
                onChange={handleChange}
                type="text"
                pattern="[0-9]{0,}"
              />
            </div>
          </div>
          {/* <div className="flex flex-col">
          <label className="mb-1 font-purple font-bold">Profile Photo</label>
          <input name="photo"
            onChange={handleChange}
            type="file"
            accept="image/*"
            className="mb-2 rounded-lg px-2 py-1 font-fuschia file:hover:scale-105 file:hover:cursor-pointer file:border-none file:bg-[#E64398] file:text-[#F0EBF4] file:px-2 file:py-1 file:text-sm file:rounded-lg file:mr-3"
            />
        </div> */}
          <div>
            <label>Bio</label>
            <input name="bio"
              value={formData.bio}
              onChange={handleChange}
              type="text"
            />
          </div>
          {error && <p className="error">{error}</p>}
          {alert && <p className="alert">{alert}</p>}
          <div className="Buttons">
            <Link className="Cancel" to={`/users/${currUser.username}`}>Cancel</Link>
            <button className="Save">Save</button>
          </div>
        </form>
      </div>
      <div className="ChangePassword">
        <Link to={`/users/${currUser.username}/change-password`}>Click here to change your password.</Link>
      </div>
    </div>

  );
}

export default EditUserForm;