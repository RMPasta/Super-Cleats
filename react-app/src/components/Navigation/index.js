import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import AddItemForm from "../AddItemForm";
import SlideOutMenu from "../SlideOutMenu";
import SlideOutCart from "../SlideOutCart";
import { getCartThunk } from "../../store/cart";
import "./Navigation.css";

function Navigation({ setTeamPicked, teamPicked, isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);
  const teams = useSelector((state) => state.team.teams);
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    sessionUser && isLoaded && dispatch(getCartThunk(sessionUser?.id));
    teamPicked && localStorage.setItem("teamId", teamPicked);
  }, [sessionUser, dispatch, isLoaded, teamPicked]);

  if (sessionUser && !cart) return <h1>Loading...</h1>;
  if (!teams) return <h1>Loading...</h1>;
  const team = teams[teamPicked - 1];
  // if (!cart) return <h1>Loading...</h1>

  return (
    <ul className="nav-ul">
      {sessionUser ? (
        <>
          <li className="nav-left-side">
            <SlideOutMenu setTeamPicked={setTeamPicked} />
            <div
              className="logo cursor-pointer"
              onClick={() => {
                history.push("/");
              }}
            >
              SUPER CLEATS
            </div>
          </li>
          <li className="nav-right-side-logged-in">
            <div className="user-profile-button">
              <NavLink exact to="/user">
                User Profile
              </NavLink>
            </div>
            <OpenModalButton
              className="login-button-nav cursor-pointer"
              buttonText="Create Item"
              onItemClick={closeMenu}
              modalComponent={<AddItemForm showMenu={showMenu} />}
            />
            {teamPicked && (
              <img
                className="favorite-team-nav"
                src={team.badge_img}
                alt={team.name}
              />
            )}
            <div className="cart-section-nav">
              {cart.quantity}
              <SlideOutCart />
            </div>
          </li>
        </>
      ) : (
        <>
          <li className="nav-left-side">
            <SlideOutMenu />
            <div
              className="logo cursor-pointer"
              onClick={() => {
                history.push("/");
              }}
            >
              SUPER CLEATS
            </div>
            {/* <NavLink exact to="/">
              Home
            </NavLink> */}
          </li>
          <li className="nav-right-side-logged-out">
            {/* <button className='cart-button-nav cursor-pointer'>Cart</button> */}
            {teamPicked && (
              <img
                className="favorite-team-nav"
                src={team.badge_img}
                alt={team.name}
              />
            )}
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
