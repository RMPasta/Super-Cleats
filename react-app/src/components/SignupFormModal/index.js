import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";
import "./SignupForm.css";
import { createCartThunk } from "../../store/cart";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [showMenu, setShowMenu] = useState(false);
	const { closeModal } = useModal();

	const closeMenu = () => setShowMenu(false);

	function validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
		return emailRegex.test(email);
	  }

	const handleSubmit = async (e) => {
		e.preventDefault();
		let hasErrors = false;
		setErrors({});
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data.errors) {
				setErrors(data);
				for (let i = 0; i < data.length; i++) {
					if (data[i].startsWith("email")) {
						const message = data[i].split(" : ")[1]
						setErrors((errors) => ({ ...errors, email: message }));
						hasErrors = true;
					}
					if (data[i].startsWith("username")) {
						const message = data[i].split(" : ")[1]
						setErrors((errors) => ({ ...errors, username: message }));
						hasErrors = true;
					}
					if (data[i].startsWith("password")) {
						const message = data[i].split(" : ")[1]
						setErrors((errors) => ({ ...errors, password: message }));
						hasErrors = true;
					}
				}
			} else {
				dispatch(createCartThunk(data.user.id))
				closeModal();
			}
		if (!email) {
		  setErrors((errors) => ({ ...errors, email: "Email is required" }));
		  hasErrors = true;
		}
		if (validateEmail(email) === false) {
			setErrors(errors => ({...errors, email: "Please enter a valid email"}));
			hasErrors = true;
		  }
		if (!username) {
		  setErrors((errors) => ({ ...errors, username: "Username is required" }));
		  hasErrors = true;
		}
		if (!password) {
		  setErrors((errors) => ({ ...errors, password: "Password is required" }));
		  hasErrors = true;
		}
		} else {
			setErrors((errors) => ({ ...errors, password: "Confirm Password field must be the same as the Password field" }));
			hasErrors = true;
		}
		if (hasErrors) return;
	};

	return (
		<div className="form-modal-container">
			<form className="form-modal" onSubmit={handleSubmit}>
			<div className="error-container">
          		{errors.email && <p>{errors.email}</p>}
          		{errors.username && <p>{errors.username}</p>}
          		{errors.password && <p>{errors.password}</p>}
        	</div>
			<h1>Sign Up</h1>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
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
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</label>
				<button type="submit" className="submit-button">Sign Up</button>
			</form>
				<OpenModalButton
					className="cancel-button modal-padding-bottom cursor-pointer"
					buttonText="Log In"
					onItemClick={closeMenu}
					modalComponent={<LoginFormModal showMenu={showMenu} />}
            />
		</div>
	);
}

export default SignupFormModal;
