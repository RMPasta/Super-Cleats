import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const { closeModal } = useModal();

  const closeMenu = () => setShowMenu(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demoUser = async () => {
    await dispatch(login("vinnie@aa.io", "password"))
    closeModal()
  }

  return (
    <>
    <div className="form-modal-container">
      <form className="form-modal-login" onSubmit={handleSubmit}>
      <h1>Log In</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
        <button onClick={() => demoUser()}>Demo User</button>
        <OpenModalButton
              className="signup-button-nav cursor-pointer"
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal showMenu={showMenu} />}
            />
    </div>
    </>
  );
}

export default LoginFormModal;
