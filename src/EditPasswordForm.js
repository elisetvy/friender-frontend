import { useState } from "react";
import { Link } from "react-router-dom";

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
      setError('Your password is incorrect!');
    }
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
    <div className="background-white w-1/3 flex flex-col justify-center items-center text-center px-14 py-10 rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col text-left w-full">
          <div className="mt-3">
          <label className="mb-1 font-purple font-bold">Old Password</label>
            <input name="password"
              required
              value={formData.password}
              onChange={handleChange}
              type="password"
              minLength={5}
              maxLength={20}
              className="mb-2 rounded-lg px-2 py-1 font-fuschia w-full"
            />
          <label className="mb-1 font-purple font-bold">New Password</label>
            <input name="newPassword"
              required
              value={formData.newPassword}
              onChange={handleChange}
              type="password"
              minLength={5}
              maxLength={20}
              className="rounded-lg px-2 py-1 font-fuschia w-full"
            />
        </div>
        {error && <p className="mt-3 bg-red-400 font-white font-bold text-center text-sm px-3 py-1 rounded-lg">{error}</p>}
        {alert && <p className="mt-3 bg-emerald-400 text-center font-white font-bold text-sm px-3 py-1 rounded-lg">{alert}</p>}
        <div className="flex justify-end gap-2 mt-3">
          <Link to={`/users/${currUser.username}`} className="font-white background-purple w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Cancel</Link>
          <button className="font-white background-fuschia w-fit px-3 py-1 text-sm rounded-lg hover:scale-105">Save</button>
        </div>
      </form>
    </div>
  </div>
);
}

export default EditPasswordForm;