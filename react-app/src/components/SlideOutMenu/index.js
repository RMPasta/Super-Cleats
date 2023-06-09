import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import AddItemForm from "../AddItemForm";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./SlideOutMenu.css";

export default function SlideOutMenu({ setTeamPicked }) {
  const [showMenu, setShowMenu] = useState(false);
  const cartUlRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const closeMenu = () => setShowMenu(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    setShowMenu(false);
    return history.push("/");
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!cartUlRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "slide-out-menu" + (showMenu ? "" : " hidden-menu");

  const teamId = localStorage.getItem("teamId");

  const linkStyle = {
    // margin: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    textDecoration: "none",
    color: "black",
  };

  return (
    <div>
      <i onClick={openMenu} className="fa fa-bars cursor-pointer" id="bars"></i>
      <ul className={ulClassName} ref={cartUlRef}>
        {user ? (
          <>
            <div className="sidebar-top">
              <p className="greeting">Hello, {user.username}!</p>
              <div
                className="sidebar-button"
                onClick={() => {
                  closeMenu();
                }}
              >
                <NavLink exact to="/user" style={linkStyle}>
                  User Profile
                </NavLink>
              </div>
              <div
                className="modal-button-wrapper"
                onClick={() => {
                  closeMenu();
                }}
              >
                <OpenModalButton
                  className="sidebar-modal cursor-pointer"
                  buttonText="Create Item"
                  onItemClick={closeMenu}
                  modalComponent={<AddItemForm showMenu={showMenu} />}
                />
              </div>
              <button
                className="sidebar-modal cursor-pointer"
                onClick={handleLogout}
              >
                Sign Out
              </button>
              {teamId && (
                <a className="a-wrapper" href="/">
                  <div
                    onClick={() => {
                      localStorage.removeItem("teamId");
                      // history.push("/");
                    }}
                  >
                    Clear favorite team
                  </div>
                </a>
              )}
            </div>
            <div className="signout-clear">
              <div className=" a-wrapper">Site By: Ryan Malmos</div>
              <a
                className="a-wrapper"
                href="https://github.com/RMPasta/Super-Cleats"
                target="blank"
                >
                GitHub Repo <i className="fab fa-github"></i>
              </a>
              <a
                className="a-wrapper"
                href="https://www.linkedin.com/in/ryan-malmos/"
                target="blank"
              >
                Linkedin <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="sidebar-top">
              <OpenModalButton
                className="submit-button sidebar-signup cursor-pointer"
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <OpenModalButton
                className="sidebar-modal cursor-pointer"
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal showMenu={showMenu} />}
              />
            </div>
            <div>
              {teamId && (
                <a className="a-wrapper" href="/">
                  <div
                    onClick={() => {
                      localStorage.removeItem("teamId");
                    }}
                  >
                    Clear favorite team
                  </div>
                </a>
              )}
              <div className=" a-wrapper">Site By: Ryan Malmos</div>
              <a
                className="a-wrapper"
                target="blank"
                href="https://github.com/RMPasta/Super-Cleats"
              >
                GitHub Repo <i className="fab fa-github"></i>
              </a>
              <a
                className="a-wrapper"
                target="blank"
                href="https://www.linkedin.com/in/ryan-malmos/"
              >
                Linkedin <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}
