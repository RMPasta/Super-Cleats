import React, { useState, useEffect, useRef } from 'react';
import './SlideOutMenu.css'

export default function SlideOutMenu() {
    const [showMenu, setShowMenu] = useState(false);
    const cartUlRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
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
            <li>Hello</li>
        </ul>
    </div>
  )
}
