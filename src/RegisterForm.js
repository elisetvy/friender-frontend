import { useState } from "react";
import { useNavigate } from "react-router-dom";


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

    if (Number(evt.target.dob.value.slice(0,4)) > 2004) {
      setError("You must be at least 18 years old to register!");
      return;
    }

    try {
      await register(formData);
      navigate("/users");
    } catch(err) {
      setError(err[0].message)
    }
  }

  return(
    <div className="text-center pt-10">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-emerald-100 w-fit ml-auto mr-auto px-4 py-4 rounded-lg">
        <div>
          <label className="mb-1">Username</label>
          <div>
            <input name="username"
              required
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
          <label className="mb-1">First Name</label>
          <div>
            <input name="name"
              required
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
              required
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
              required
              value={formData.dob}
              onChange={handleChange}
              type="date"
              className="bg-emerald-300 mb-2 rounded-lg px-2 py-1"
              />
          </div>
        </div>
        <div>
          <label className="mb-1">Profile Photo</label>
          <div>
            <input name="photo"
              onChange={handleChange}
              type="file"
              className="bg-emerald-300 mb-2 rounded-lg px-2 py-1"
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
        <button className="bg-emerald-300 mt-4 px-3 py-1 rounded-lg">Register</button>
      </form>
    </div>

  )
}

export default RegisterForm;