import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const tickets = useSelector((state) => state.ticket.tickets);
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  const cartTickets = useSelector((state) => state.cart.cartTickets);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [slidePosition1, setSlidePosition1] = useState(0);
  const [slidePosition2, setSlidePosition2] = useState(0);


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
  console.log(tickets)
  // if (!cart) return <h1>Loading...</h1>

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


  const getDate = (eventDate) => {
    const date = new Date(eventDate);
    let formattedDate = date.toLocaleDateString("en-CA");
    const day = parseInt(formattedDate.split("-")[2]) + 1;
    formattedDate = formattedDate.split("-");
    let finalDate = [formattedDate[1], day, formattedDate[0]];
    finalDate = finalDate.join("-");
    return finalDate;
  };

  const ticketsArr1 = tickets.slice(0, tickets.length / 2).map((ticket, i) => (
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
      {user ? cartTickets &&
      cartTickets.filter((cartTicket) => cartTicket.id === ticket.id).length ===
        0 ? (
        <button
          className="add-to-cart cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setSlidePosition1(i);
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
            setSlidePosition1(i);
            removeTicket(ticket);
          }}
        >
          Remove from cart
        </button>
      ) : <></>}
    </div>
  ));

  const ticketsArr2 = tickets.slice(tickets.length / 2).map((ticket, i) => (
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
      {user ? cartTickets &&
      cartTickets.filter((cartTicket) => cartTicket.id === ticket.id).length ===
        0 ? (
        <button
          className="add-to-cart cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setSlidePosition2(i);
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
            setSlidePosition2(i);
            removeTicket(ticket);
          }}
        >
          Remove from cart
        </button>
      ) : <></>}

    </div>
  ));

  const responsive = {
    300: { items: 1 },
    700: { items: 2 },
    1000: { items: 3 },
    1300: { items: 4 },
    1600: { items: 5 },
  };

  return (
    <div className="tickets-container">
      <MapContainer />
      {/* <div className="item-gallery">
        {filtered?.length > 0 ?
            <AliceCarousel
            infinite
            mouseTracking
            preventEventOnTouchMove
            disableDotsControls={isMobile}
            activeIndex={slidePosition}
            responsive={responsive}
            items={filteredArr}
            /> :
            <div className="no-filter-found">Nothing with this combo, adjust the filters!</div>}
      </div> */}
      <div>
        <AliceCarousel
          infinite
          mouseTracking
          preventEventOnTouchMove
          activeIndex={slidePosition2}
          responsive={responsive}
          items={ticketsArr2}
        />
      </div>
    </div>
  );
}
