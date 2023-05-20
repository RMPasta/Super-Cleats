import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import AddItemForm from "../AddItemForm";
import SlideOutMenu from "../SlideOutMenu";
import SlideOutCart from "../SlideOutCart";
import { getCartThunk } from "../../store/cart";

function Navigation({ setTeamPicked, isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    isLoaded && dispatch(getCartThunk(sessionUser?.id));
  }, [sessionUser, dispatch, isLoaded]);

  if (sessionUser && !cart) return <h1>Loading...</h1>;
  // if (!cart) return <h1>Loading...</h1>

  return (
    <ul className="nav-ul">
      {sessionUser ? (
        <>
          <li>
            <SlideOutMenu setTeamPicked={setTeamPicked} />
          </li>
          <li>
            <NavLink exact to="/">
              LOGO
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/user">
              User Profile
            </NavLink>
          </li>
          <li>
            <OpenModalButton
              className="login-button-nav cursor-pointer"
              buttonText="Create Item"
              onItemClick={closeMenu}
              modalComponent={<AddItemForm showMenu={showMenu} />}
            />
          </li>
          <li className="cart-section-nav">
            {cart.quantity}
            <SlideOutCart />
          </li>
        </>
      ) : (
        <>
          <li>
            <SlideOutMenu />
            {/* <NavLink exact to="/">
              Home
            </NavLink> */}
          </li>
          <li className="nav-right-side">
            {/* <button className='cart-button-nav cursor-pointer'>Cart</button> */}
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
