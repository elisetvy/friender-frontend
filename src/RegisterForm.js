import { useState } from "react";
import { useNavigate } from "react-router-dom";


function RegisterForm({ handleSave }){

  const navigate = useNavigate();

  const initialFormData = {username: "",
                          password: "",
                          firstName: "",
                          lastName: "",
                          email: "",
                          zipcode: "",
                          friendRadius: "",
                          hobbies: "",
                          interests: "",
                          photoProfile: ""
                          }

  const [formData, setFormData]= useState(initialFormData);
  const [error, setError] = useState(null);

  function handleChange(evt){
    const {name, value, files} = evt.target;
    if(name !== "photoProfile"){
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
      navigate("/cats");
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
            <input name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              maxLength={20}
              />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input name="lastName"
              required
              value={formData.lastName}
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
          <label>Zipcode</label>
          <div>
            <input name="zipcode"
              required
              value={formData.zipcode}
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
            <input name="friendRadius"
              required
              value={formData.friendRadius}
              onChange={handleChange}
              type="text"
              />
          </div>
        </div>
        <div>
          <label>Hobbies</label>
          <div>
            <input name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              type="text"
              />
          </div>
        </div>
        <div>
          <label>Interests</label>
          <div>
            <input name="interests"
              value={formData.interests}
              onChange={handleChange}
              type="text"
              />
          </div>
        </div>
        <div>
          <label>Profile Photo</label>
          <div>
            <input name="photoProfile"
              onChange={handleChange}
              type="file"
              />
          </div>
        </div>
        {error && <p>{error}</p>}
        <button className="btn btn-primary">Submit Photo</button>
      </form>
    </div>

  )
}

export default RegisterForm;