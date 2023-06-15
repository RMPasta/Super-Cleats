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
  const [errors, setErrors] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const { closeModal } = useModal();

  const closeMenu = () => setShowMenu(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    setErrors({});

    if (!email) {
      setErrors((errors) => ({ ...errors, email: "Email is required" }));
      hasErrors = true;
    }
    if (!password) {
      setErrors((errors) => ({ ...errors, password: "Password is required" }));
      hasErrors = true;
    }


    const data = await dispatch(login(email, password));
    if (data) {
      // for (let i = 0; i < data.length; i++) {
      //   if (data[i].startsWith("email")) {
      //     const message = data[i].split(" : ")[1]
      //     setErrors((errors) => ({ ...errors, email: message }));
      //     hasErrors = true;
      //   }
      //   if (data[i].startsWith("password")) {
      //     const message = data[i].split(" : ")[1]
      //     setErrors((errors) => ({ ...errors, password: message }));
      //     hasErrors = true;
      //   }
      // }
      // setErrors(data);
      return;
    } else {
        closeModal()
    }
    if (hasErrors) return;
  };

  const demoUser = async () => {
    await dispatch(login("vinnie@aa.io", "password"))
    closeModal()
  }

  return (
    <>
    <div className="form-modal-container">
      <form className="form-modal-login" onSubmit={handleSubmit}>
      <div className="error-container">
          {errors.email && <p>{errors.email}</p>}
          {errors.password && <p>{errors.password}</p>}
        </div>
      <h1>Log In</h1>
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
        <button className="submit-button cursor-pointer" type="submit">Log In</button>
      </form>
        <button className="demo-button cursor-pointer" onClick={() => demoUser()}>Demo User</button>
        <OpenModalButton
              className="cancel-button modal-padding-bottom cursor-pointer"
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal showMenu={showMenu} />}
            />
    </div>
    </>
  );
}

export default LoginFormModal;
