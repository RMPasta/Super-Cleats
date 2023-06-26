import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./SearchBar.css"

export default function SearchBar({ searchType }) {
    const history = useHistory();
    const searchRef = useRef();
    const items = useSelector((state) => state.item.items);
    const user = useSelector((state) => state.session.user);
    const tickets = useSelector((state) => state.ticket.tickets);
    const [showMenu, setShowMenu] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        setSearchInput("")
    }, [searchType])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!searchRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const searchResultsClassName = "search-results scrollable-y" + (showMenu ? " results-visible" : " results-hidden");

    if (!items) return <></>

  return (
    <div ref={searchRef}>
        <input
        type="text"
        // value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={"Search " + (searchType === "tickets" ? "Tickets" : "Products") + "..."}
        onFocus={() => setShowMenu(true)}
        />
        {/* showResults && searchInput.length > 0 ? "search-results search-results-visible scrollable-y" : "search-results search-results-hidden scrollable-y" */}
        <div className={searchResultsClassName}>
            {searchType === "items" && items.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()) || item.description.toLowerCase().includes(searchInput.toLowerCase())).slice(0, 20).map(item => (
                <div key={item.id} onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowMenu(false)
                    history.push(`/item/${item.id}`);
                }}>{item.name}</div>
            ))}
        </div>
    </div>
  )
}
