import { useState } from "react";
import { Link } from "react-router-dom";

import FrienderApi from "./api";

/** Form to edit user info. */
function EditUserForm({ currUser, update }){
  const initialFormData = {username: currUser.username,
                          password: "",
                          name: currUser.name,
                          email: currUser.email,
                          zip: currUser.zip,
                          radius: currUser.radius,
                          // photo: currUser.photo,
                          bio: currUser.bio,
                          }

  const [formData, setFormData]= useState(initialFormData);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  /** Update state with form data. */
  function handleChange(evt){
    const {name, value, files} = evt.target;

    if (name !== "photo"){
      setFormData( f => ({...f, [name]: value}));
    } else {
      setFormData( f => ({...f, [name]: files[0]}));
    }
  }

  /** Call update function with form data. */
  async function handleSubmit(evt){
    evt.preventDefault();

    // Duplicate check
    if (formData.username !== currUser.username) {
      try {
        await FrienderApi.getUser(formData.username);
        setError(`User already exists: ${formData.username}`);
        return;
      } catch(err) {
      }
    }

    try {
      await update(currUser.username, formData);
      if (error !== null) setError(null);
      setAlert('Your changes have been saved.')
    } catch(err) {
      setAlert(null);
      setError(err[0].message)
    }
  }

  return(
    <div className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="background-white w-2/5 px-4 py-4 rounded-lg">
        <div className="w-full flex gap-4">
          <div className="w-1/2 flex flex-col">
            <label className="mb-1 font-purple font-bold">Username</label>
              <input name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                maxLength={20}
                className="mb-2 rounded-lg px-2 py-1 font-fuschia"
                />
          </div>
          <div className="w-1/2 flex flex-col">
            <label className="mb-1 font-purple font-bold">Password</label>
            <input name="password"
              required
              value={formData.password}
              onChange={handleChange}
              type="password"
              autoComplete="off"
              minLength={5}
              maxLength={100}
              className="mb-2 rounded-lg px-2 py-1 font-fuschia"
              />
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2 flex flex-col">
            <label className="mb-1 font-purple font-bold">Name</label>
            <input name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              maxLength={20}
              className="mb-2 rounded-lg px-2 py-1 font-fuschia"
              />
          </div>
          <div className="w-1/2 flex flex-col">
            <label className="mb-1 font-purple font-bold">Email</label>
            <input name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              maxLength={50}
              className="mb-2 rounded-lg px-2 py-1 font-fuschia"
              />
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/3 flex flex-col">
            <label className="mb-1 font-purple font-bold">Date of Birth</label>
            <input name="dob"
              value={currUser.dob}
              onChange={handleChange}
              type="date"
              className="mb-2 rounded-lg px-2 py-1 font-white background-fuschia opacity-25 w-full"
              disabled
              />
          </div>
          <div className="w-1/3 flex flex-col">
            <label className="mb-1 font-purple font-bold">ZIP Code</label>
            <input name="zip"
              value={formData.zip}
              onChange={handleChange}
              type="text"
              pattern="[0-9]{5}"
              minLength={5}
              maxLength={5}
              className="mb-2 rounded-lg px-2 py-1 font-fuschia w-full"
              />
          </div>
          <div className="w-1/3 flex flex-col">
            <label className="mb-1 font-purple font-bold">Match Radius</label>
            <input name="radius"
              value={formData.radius}
              onChange={handleChange}
              type="text"
              pattern="[0-9]{0,}"
              className="mb-2 rounded-lg px-2 py-1 font-fuschia w-full"
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
        <div className="flex flex-col">
          <label className="mb-1 font-purple font-bold">Bio</label>
          <input name="bio"
            value={formData.bio}
            onChange={handleChange}
            type="text"
            className="mb-3 rounded-lg px-2 py-1 font-fuschia"
            />
        </div>
        {error && <p className="mb-3 bg-red-400 font-bold text-center font-white text-sm px-3 py-1 rounded-lg">{error}</p>}
        {alert && <p className="mb-3 bg-emerald-400 font-bold text-center font-white text-sm px-3 py-1 rounded-lg">{alert}</p>}
        <div className="flex justify-end gap-2">
          <Link to={`/users/${currUser.username}`} className="font-white background-purple w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Cancel</Link>
          <button className="font-white background-fuschia w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Save</button>
        </div>
      </form>
      <Link to={`/users/${currUser.username}/change-password`} className="mt-3 text-sm font-fuschia">Click here to change your password.</Link>
    </div>

  )
}

export default EditUserForm;