import { useState } from "react";
import { useNavigate } from "react-router-dom";
import calculateAge from "./utils";


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

  const [form, setForm] = useState(1);
  const [formData, setFormData]= useState(initialFormData);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const {name, value, files} = e.target;

    if (name !== "photo"){
      setFormData( f => ({...f, [name]: value}));
    } else {
      setFormData( f => ({...f, [name]: files[0]}));
    }
  }

  async function handleSubmit(evt){
    evt.preventDefault();

    try {
      await register(formData);
      navigate("/users");
    } catch(err) {
      setError(err[0].message)
    }
  }

  return(
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-emerald-100 w-2/5 flex flex-col justify-center items-center text-center px-14 py-10 rounded-lg">
        { form === 1 &&
        <>
        <p className="text-lg font-bold">Sign up for Friender today</p>
        <p className="text-sm">Choose a username and password to begin making friends!</p>
        <form className="mt-4 flex flex-col text-left w-full">
          <label className="mb-1">Username</label>
          <input name="username"
              required
              value={formData.username}
              onChange={handleChange}
              type="text"
              maxLength={20}
              className="mb-2 rounded-lg px-2 py-1"
              />
          <label className="mb-1">Password</label>
          <input name="password"
              required
              value={formData.password}
              onChange={handleChange}
              type="password"
              autoComplete="off"
              minLength={5}
              maxLength={100}
              className="mb-3 rounded-lg px-2 py-1"
          />
          <div className="flex justify-end">
          <button onClick={(e) => { e.preventDefault(); setForm(2); }} className="bg-emerald-300 w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Continue <i className="bi bi-arrow-right"></i></button>
          </div>
        </form>
        <div className="mt-4 flex gap-2">
          <i className="bi bi-circle-fill text-emerald-300 text-[8px]"></i>
          <i className="bi bi-circle-fill text-white text-[8px]"></i>
          <i className="bi bi-circle-fill text-white text-[8px]"></i>
          <i className="bi bi-circle-fill text-white text-[8px]"></i>
        </div>
        </>
      }
      { form === 2 &&
      <>
      <form className="mt-4 flex flex-col text-left w-full">
        <label className="mb-1">Name</label>
        <input name="name"
              required
              value={formData.name}
              onChange={handleChange}
              type="text"
              maxLength={20}
              className="mb-2 rounded-lg px-2 py-1"
              />
        <label className="mb-1">Email Address</label>
        <input name="email"
              required
              value={formData.email}
              onChange={handleChange}
              type="email"
              maxLength={50}
              className="mb-2 rounded-lg px-2 py-1"
              />
        <label className="mb-1">Date of Birth</label>
        <input name="dob"
          required
          value={formData.dob}
          onChange={handleChange}
          type="date"
          className="mb-3 rounded-lg px-2 py-1"
          />
        <div className="flex justify-end">
        <button onClick={(e) => { e.preventDefault(); setForm(3); }} className="bg-emerald-300 w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Continue <i className="bi bi-arrow-right"></i></button>
        </div>
      </form>
      <div className="mt-4 flex gap-2">
        <i onClick={(e) => { e.preventDefault(); setForm(1); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
        <i className="bi bi-circle-fill text-emerald-300 text-[8px]"></i>
        <i className="bi bi-circle-fill text-white text-[8px]"></i>
        <i className="bi bi-circle-fill text-white text-[8px]"></i>
      </div>
      </>
      }
      { form === 3 &&
      <>
        <form className="mt-4 flex flex-col text-left w-full">
          <label className="mb-1">ZIP Code</label>
          <input name="zip"
            required
            value={formData.zip}
            onChange={handleChange}
            pattern="[0-9]{5}"
            minLength={5}
            maxLength={5}
            className="mb-2 rounded-lg px-2 py-1"
            />
          <label className="mb-1">Friend Radius</label>
          <input name="radius"
            value={formData.radius}
            onChange={handleChange}
            type="text"
            className="mb-3 rounded-lg px-2 py-1"
            />
          <div className="flex justify-end">
          <button onClick={(e) => { e.preventDefault(); setForm(4); }} className="bg-emerald-300 w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Continue <i className="bi bi-arrow-right"></i></button>
          </div>
        </form>
        <div className="mt-4 flex gap-2">
        <i onClick={(e) => { e.preventDefault(); setForm(1); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
        <i onClick={(e) => { e.preventDefault(); setForm(2); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
        <i className="bi bi-circle-fill text-emerald-300 text-[8px]"></i>
        <i className="bi bi-circle-fill text-white text-[8px]"></i>
        </div>
      </>
      }
      { form === 4 &&
      <>
        <form className="mt-4 flex flex-col text-left w-full">
          <label className="mb-1">Profile Photo</label>
            <input name="photo"
              onChange={handleChange}
              type="file"
              className="mb-2 rounded-lg px-2 py-1"
              />
          <label className="mb-1">Bio </label>
          <input name="bio"
              value={formData.bio}
              onChange={handleChange}
              type="text"
              className="mb-3 rounded-lg px-2 py-1"
              />
          {error && <p className="mb-3 text-red-400 font-bold">{error}</p>}
          <div className="flex justify-end">
          <button onClick={handleSubmit} className="bg-emerald-300 w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Submit</button>
          </div>
        </form>
        <div className="mt-4 flex gap-2">
        <i onClick={(e) => { e.preventDefault(); setForm(1); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
        <i onClick={(e) => { e.preventDefault(); setForm(2); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
        <i onClick={(e) => { e.preventDefault(); setForm(3); }} className="hover:cursor-pointer bi bi-circle-fill text-white text-[8px]"></i>
        <i className="bi bi-circle-fill text-emerald-300 text-[8px]"></i>
        </div>
      </>
      }
      </div>
    </div>
  )
}

export default RegisterForm;