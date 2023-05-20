import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./SlideOutMenu.css";

export default function SlideOutMenu({ setTeamPicked }) {
  const [showMenu, setShowMenu] = useState(false);
  const cartUlRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    setShowMenu(false);
    setTeamPicked(false);
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

  return (
    <div>
      <i onClick={openMenu} className="fa fa-bars cursor-pointer" id="bars"></i>
      <ul className={ulClassName} ref={cartUlRef}>
        {user ? (
          <>
            <div>Hello, {user.username}!</div>
            <button onClick={handleLogout}>Sign Out</button>
          </>
        ) : (
          <div>sign in</div>
        )}
      </ul>
    </div>
  );
}
