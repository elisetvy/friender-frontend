import { useState } from "react";
import { Link } from "react-router-dom";

import "./EditPassword.css";

/** Form to change password. */
function EditPasswordForm({ currUser, update }) {

  const initialFormData = {
    password: "",
    newPassword: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  /** Update state with form data. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
  }

  /** Call function to update user with with form data. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      await update(currUser.username, formData);
      setFormData(initialFormData);
      if (error !== null) setError(null);
      setAlert('Your new password has been saved.');
    } catch (err) {
      setAlert(null);
      setError('Your old password is incorrect!');
    }
  }

  return (
    <div className="EditPassword">
      <form onSubmit={handleSubmit}>
        <label>Old Password</label>
        <input name="password"
          required
          value={formData.password}
          onChange={handleChange}
          type="password"
          minLength={5}
          maxLength={20}
        />
        <label>New Password</label>
        <input name="newPassword"
          required
          value={formData.newPassword}
          onChange={handleChange}
          type="password"
          minLength={5}
          maxLength={20}
        />
        {error && <p className="error">{error}</p>}
        {alert && <p className="alert">{alert}</p>}
        <div className="Buttons">
          <Link className="Cancel" to={`/users/${currUser.username}`}>Cancel</Link>
          <button className="Save">Save</button>
        </div>
      </form>
    </div>
  );
}

export default EditPasswordForm;