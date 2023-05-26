import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsThunk } from "../../store/ticket";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  getCartThunk,
  addTicketToCartThunk,
  removeTicketFromCartThunk,
} from "../../store/cart";
import { getItemsThunk } from "../../store/item";
import MapContainer from "../Maps";
import "./Tickets.css";

export default function Tickets() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticket.tickets);
  //   const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  const cartTickets = useSelector((state) => state.cart.cartTickets);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  //   const teams = useSelector((state) => state.team.teams);
  //   const [quantity, setQuantity] = useState(0);
  //   const [total, setTotal] = useState(0);
  //   const [filtered, setFiltered] = useState(items);
  //   const [slidePosition, setSlidePosition] = useState(0);
  //   const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (cart) setQuantity(cart.quantity);
    if (cart) setTotal(cart.total_price);
    dispatch(getItemsThunk());
  }, [dispatch, cart]);

  useEffect(() => {
    dispatch(getTicketsThunk());
  }, [dispatch]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getTicketsThunk());
    }, 30);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);

  if (!tickets) return <h1>Loading...</h1>;
  // if (!cart) return <h1>Loading...</h1>;

  //   const handleDragStart = (e) => e.preventDefault();

  const addToCart = async (ticket) => {
    // e.preventDefault();
    // e.stopPropagation();
    const newQty = quantity + 1;
    const newTotalPrice = total + parseInt(ticket.price);
    // pass in cart id for fetch request
    // send in cart id and ticket id to create the association
    await dispatch(
      addTicketToCartThunk({
        id: cart.id,
        quantity: newQty,
        total_price: newTotalPrice,
        ticket_id: ticket.id,
      })
    );
    await dispatch(getCartThunk(cart.id));
  };

  const removeTicket = async (ticket) => {
    const newQty = quantity - 1;
    const newTotalPrice = total - parseInt(ticket.price);
    await dispatch(
      removeTicketFromCartThunk({
        id: cart.id,
        quantity: newQty,
        total_price: newTotalPrice,
        ticket_id: ticket.id,
      })
    );
    await dispatch(getCartThunk(cart.id));
  };

  //   const getItemBadge = (item) => {
  //     if (teams && item) {
  //       const team = teams.find((team) => team.id === item.team_id);
  //       return team.badge_img;
  //     }
  //   };
  const getDate = (eventDate) => {
    const date = new Date(eventDate);
    let formattedDate = date.toLocaleDateString("en-CA");
    const day = parseInt(formattedDate.split("-")[2]) + 1;
    formattedDate = formattedDate.split("-");
    let finalDate = [formattedDate[1], day, formattedDate[0]];
    finalDate = finalDate.join("-");
    return finalDate;
  };

  const ticketsArr1 = tickets.slice(0, tickets.length / 2).map((ticket) => (
    <div className="ticket-card">
      <img
        className="ticket-img"
        src={ticket.ticket_img}
        alt={ticket.stadium}
      />
      <div className="stadium">Stadium: {ticket.stadium}</div>
      <div>{ticket.match}</div>
      <div>Price: ${ticket.price}</div>
      <div>{getDate(ticket.event_date)}</div>
      {cartTickets &&
      cartTickets.filter((cartTicket) => cartTicket.id === ticket.id).length ===
        0 ? (
        <button
          className="add-to-cart cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            // setSlidePosition(i);
            addToCart(ticket);
          }}
        >
          Add to cart
        </button>
      ) : (
        <button
          className="remove-from-cart cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            // setSlidePosition(i);
            removeTicket(ticket);
          }}
        >
          Remove from cart
        </button>
      )}
      {/* <button onClick={(e) => addToCart(e, ticket)}>ADD</button>
      <button onClick={(e) => removeFromCart(e, ticket)}>REMOVE</button> */}
    </div>
  ));

  const ticketsArr2 = tickets.slice(tickets.length / 2).map((ticket) => (
    <div className="ticket-card">
      <img
        className="ticket-img"
        src={ticket.ticket_img}
        alt={ticket.stadium}
      />
      <div className="stadium">Stadium: {ticket.stadium}</div>
      <div>{ticket.match}</div>
      <div>Price: ${ticket.price}</div>
      <div>{getDate(ticket.event_date)}</div>
      {cartTickets &&
      cartTickets.filter((cartTicket) => cartTicket.id === ticket.id).length ===
        0 ? (
        <button
          className="add-to-cart cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            // setSlidePosition(i);
            addToCart(ticket);
          }}
        >
          Add to cart
        </button>
      ) : (
        <button
          className="remove-from-cart cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            // setSlidePosition(i);
            removeTicket(ticket);
          }}
        >
          Remove from cart
        </button>
      )}
      {/* <button onClick={(e) => addToCart(e, ticket)}>ADD</button>
      <button onClick={(e) => removeFromCart(e, ticket)}>REMOVE</button> */}
    </div>
  ));

  const responsive = {
    400: { items: 1 },
    1380: { items: 2 },
    // 1640: { items: 3 },
  };

  return (
    <div className="tickets-container">
      <div className="ticket-carousel">
        <AliceCarousel
          infinite
          mouseTracking
          preventEventOnTouchMove
          responsive={responsive}
          items={ticketsArr1}
        />
        <AliceCarousel
          infinite
          mouseTracking
          preventEventOnTouchMove
          responsive={responsive}
          items={ticketsArr2}
        />
      </div>
      <div className="map-container">
        <MapContainer />
      </div>
    </div>
  );
}
