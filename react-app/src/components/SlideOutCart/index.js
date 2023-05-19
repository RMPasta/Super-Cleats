import React, { useState, useEffect, useRef } from 'react';
// import { NavLink, useHistory } from "react-router-dom";
// import CreateBoardForm from '../Boards/CreateBoardForm';
// import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Cart'
import './SlideOutCart.css'

export default function SlideOutCart({ addItemRef }) {
    const [showMenu, setShowMenu] = useState(false);
    // const dispatch = useDispatch();
    // const history = useHistory();
    const ulRef = useRef();

    // useEffect(() => {
    //   dispatch(getBoardsByUserId())
    // }, [dispatch])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

    useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
        }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const ulClassName = "slide-out-cart" + (showMenu ? "" : " hidden-cart");

  return (
    <div>
      <i onClick={openMenu} className="fa fa-cart-plus cursor-pointer" id="cart"></i>
        <ul className={ulClassName} ref={ulRef}>
            <Cart setShowMenu={setShowMenu}/>
        </ul>
    </div>
  )
}
