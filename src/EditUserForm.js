import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditUserForm({ currUser, update }){

  const navigate = useNavigate();

  const initialFormData = {username: currUser.username,
                          password: "",
                          name: currUser.name,
                          email: currUser.email,
                          zip: currUser.zip,
                          radius: currUser.radius,
                          bio: currUser.bio,
                          }

  const [formData, setFormData]= useState(initialFormData);
  const [error, setError] = useState(null);

  function handleChange(evt){
    const {name, value, files} = evt.target;
    if (name !== "photo"){
      setFormData( f => ({...f, [name]: value}));
    } else {
      setFormData( f => ({...f, [name]: files[0]}));
    }
  }

  async function handleSubmit(evt){
    evt.preventDefault();

    try {
      await update(currUser.username, formData);
      navigate(`/users/${currUser.username}`);
    } catch(err) {
      console.log(err)
      setError(err[0].message)
    }
  }

  return(
    <div className="text-center">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-emerald-100 w-fit ml-auto mr-auto px-4 py-4 rounded-lg">
        <div>
          <label className="mb-1">Username</label>
          <div>
            <input name="username"
              value={formData.username}
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
              value={formData.password}
              onChange={handleChange}
              type="password"
              autoComplete="off"
              minLength={5}
              maxLength={100}
              className="bg-emerald-300 mb-2 rounded-lg px-2 py-1"
              />
          </div>
        </div>
        <div>
          <label className="mb-1">Name</label>
          <div>
            <input name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              maxLength={20}
              className="bg-emerald-300 mb-2 rounded-lg px-2 py-1"
              />
          </div>
        </div>
        <div>
          <label className="mb-1">Email</label>
          <div>
            <input name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              maxLength={50}
              className="bg-emerald-300 mb-2 rounded-lg px-2 py-1"
              />
          </div>
        </div>
        <div>
          <label className="mb-1">Date of Birth</label>
          <div>
            <input name="dob"
              value={currUser.dob}
              onChange={handleChange}
              type="date"
              className="bg-emerald-300 mb-2 rounded-lg px-2 py-1"
              disabled
              />
          </div>
        </div>
        <div>
          <label className="mb-1">ZIP Code</label>
          <div>
            <input name="zip"
              required
              value={formData.zip}
              onChange={handleChange}
              type="text"
              pattern="[0-9]{5}"
              minLength={5}
              maxLength={5}
              className="bg-emerald-300 mb-2 rounded-lg px-2 py-1"
              />
          </div>
        </div>
        <div>
          <label className="mb-1">Friend Radius</label>
          <div>
            <input name="radius"
              value={formData.radius}
              onChange={handleChange}
              type="text"
              pattern="[0-9]"
              className="bg-emerald-300 mb-2 rounded-lg px-2 py-1"
              />
          </div>
        </div>
        <div>
          <label className="mb-1">Bio</label>
          <div>
            <input name="bio"
              value={formData.bio}
              onChange={handleChange}
              type="text"
              className="bg-emerald-300 rounded-lg px-2 py-1"
              />
          </div>
        </div>
        {error && <p className="mt-4 text-red-400 font-bold">{error}</p>}
        <button className="bg-emerald-300 mt-4 px-3 py-1 rounded-lg">Save</button>
      </form>
    </div>

  )
}

export default EditUserForm;