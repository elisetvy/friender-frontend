import { useState } from "react";
import { useNavigate } from "react-router-dom";


function HomePage({handleSave, currUser}){

  // const navigate = useNavigate;

  const initialFormData = {username: null,
                          password: null,
                          firstName: null,
                          lastName: null,
                          email: null,
                          zipcode: null,
                          friendRadius: null,
                          hobbies: null,
                          interests: null,
                          photoProfile: null
                          }

  const [formData, setFormData]= useState(initialFormData);

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
    console.log(formData.username)

    await handleSave(formData);
    // console.log(formData);
    // console.log(formData.photoProfile);
    setFormData(initialFormData);
    // navigate("/cats");
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
              minLength={5}
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
        <button>Submit Photo</button>
      </form>
      {currUser && <img alt="our user" src={currUser.profilePic} />}
    </div>

  )
}

export default HomePage;