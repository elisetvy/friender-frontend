import { useState } from "react";
import { useNavigate } from "react-router-dom";


function RegisterForm({ handleSave }){

  const navigate = useNavigate();

  const initialFormData = {username: "",
                          password: "",
                          fname: "",
                          lname: "",
                          email: "",
                          photo: "",
                          zip: "",
                          radius: "",
                          bio: "",
                          }

  const [formData, setFormData]= useState(initialFormData);
  const [error, setError] = useState(null);

  function handleChange(evt){
    const {name, value, files} = evt.target;
    if(name !== "photo"){
      setFormData( f => ({...f, [name]:value}));
    }else{
      setFormData( f => ({...f, [name]:files[0]}));
    }

  }

  async function handleSubmit(evt){
    evt.preventDefault();
    try {
      await handleSave(formData);;
      setFormData(initialFormData);
      navigate("/users");
    } catch(err) {
      setError("Invalid input(s)")
    }
  }

  return(
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Username</label>
          <div>
            <input name="username"
              required
              value={formData.username}
              onChange={handleChange}
              type="text"
              maxLength={20}
              />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input name="password"
              required
              value={formData.password}
              onChange={handleChange}
              type="password"
              autoComplete="off"
              minLength={5}
              maxLength={20}
              />
          </div>
        </div>
        <div>
          <label>First Name</label>
          <div>
            <input name="fname"
              required
              value={formData.fname}
              onChange={handleChange}
              type="text"
              maxLength={20}
              />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input name="lname"
              required
              value={formData.lname}
              onChange={handleChange}
              type="text"
              maxLength={20}
              />
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <input name="email"
              required
              value={formData.email}
              onChange={handleChange}
              type="email"
              maxLength={30}
              />
          </div>
        </div>
        <div>
          <label>Profile Photo</label>
          <div>
            <input name="photo"
              onChange={handleChange}
              type="file"
              />
          </div>
        </div>
        <div>
          <label>ZIP Code</label>
          <div>
            <input name="zip"
              required
              value={formData.zip}
              onChange={handleChange}
              type="text"
              pattern="[0-9]{5}"
              minLength={5}
              maxLength={5}
              />
          </div>
        </div>
        <div>
          <label>Friend Radius</label>
          <div>
            <input name="radius"
              required
              value={formData.radius}
              onChange={handleChange}
              type="text"
              />
          </div>
        </div>
        <div>
          <label>Bio</label>
          <div>
            <input name="bio"
              value={formData.bio}
              onChange={handleChange}
              type="text"
              />
          </div>
        </div>
        {error && <p>{error}</p>}
        <button className="">Submit Photo</button>
      </form>
    </div>

  )
}

export default RegisterForm;