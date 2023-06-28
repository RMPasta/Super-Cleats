import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./SearchBar.css"
import { getItemsThunk } from "../../store/item";
import { getTicketsThunk } from "../../store/ticket";

export default function SearchBar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const searchRef = useRef();
    const items = useSelector((state) => state.item.items);
    const user = useSelector((state) => state.session.user);
    const tickets = useSelector((state) => state.ticket.tickets);
    const [showMenu, setShowMenu] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchType, setSearchType] = useState("")

    useEffect(() => {
      dispatch(getItemsThunk())
      dispatch(getTicketsThunk())
        if (window.location.href.endsWith("tickets")) {
          setSearchType("tickets")
        } else {
          setSearchType("items")
        }
    }, [window.location.href])

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
    if (!tickets) return <></>

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase())).slice(0, 5);
    const filteredTickets = tickets.filter(ticket => ticket.match.toLowerCase().includes(searchInput.toLowerCase()) ||
    ticket.stadium.toLowerCase().includes(searchInput.toLowerCase())).slice(0, 5);

  return (
    <div ref={searchRef}>
        <input
        className="searchbar"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={"Search " + (searchType === "tickets" ? "Tickets" : "Products") + "..."}
        onFocus={() => setShowMenu(true)}
        />
        <div className={searchResultsClassName}>
            {searchType === "items" ? filteredItems.length > 0 ? filteredItems.map(item => (
                <div
                className="cart-item-info cursor-pointer result-card"
                key={item.id}
                onClick={() => {
                  history.push(`/item/${item.id}`);
                  setShowMenu(false);
                }}
              >
                <div className="item-info">
                  <div>
                    {item.name.length > 25
                      ? item.name.slice(0, 25) + "..."
                      : item.name}
                  </div>
                </div>
                <div className="image-trash-container">
                  <div>${item.price}</div>
                  <img
                    src={item.item_img}
                    className="cart-item-image"
                    alt={item.name}
                  />
                </div>
              </div>
            )) : <h3>No Results!</h3> :
            filteredTickets.length > 0 ? filteredTickets.map((ticket) => {
                return (
                  <div
                    className="cart-item-info cursor-pointer result-card-ticket"
                    key={ticket.id}
                    onClick={() => {
                      history.push(`/ticket/${ticket.id}`);
                      setShowMenu(false);
                    }}
                  >
                    <div className="item-info">
                      <div>{ticket.match}</div>
                      <div>@ {ticket.stadium}</div>
                    </div>
                    <div className="image-trash-container">
                      <div>${ticket.price}</div>
                      <img
                        src={ticket.ticket_img}
                        className="cart-item-image"
                        alt={ticket.match}
                      />
                    </div>
                  </div>
            )
            }) : <h3>No Results!</h3> }
        </div>
    </div>
  )
}
