import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';
import AddItemForm from '../AddItemForm';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [showMenu, setShowMenu] = useState(false);

	const closeMenu = () => setShowMenu(false);

	return (
		<ul className='nav-ul'>
			{sessionUser ? (
				<>
					<li>
						<i className="fas fa-bars" />
					</li>
					<li>
						<NavLink exact to="/">LOGO</NavLink>
					</li>
					<li>
						<NavLink exact to="/user">User Profile</NavLink>
					</li>
					<li>
						<OpenModalButton
							className="login-button-nav cursor-pointer"
							buttonText="Create Item"
							onItemClick={closeMenu}
							modalComponent={<AddItemForm showMenu={showMenu} />}
						/>
					</li>
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				</>
			) : (
				<>
					<li>
						<NavLink exact to="/">Home</NavLink>
					</li>
					<li className='nav-right-side'>
						<button className='cart-button-nav cursor-pointer'>Cart</button>
						<OpenModalButton
							className="login-button-nav cursor-pointer"
							buttonText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal showMenu={showMenu} />}
						/>
						<OpenModalButton
							className="signup-button-nav cursor-pointer"
							buttonText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</li>

				</>
			)}
		</ul>
	);
}

export default Navigation;
