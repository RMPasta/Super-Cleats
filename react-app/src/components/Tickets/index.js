import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTicketsThunk } from "../../store/ticket";
import OpenModalButton from "../OpenModalButton";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  getCartThunk,
  addTicketToCartThunk,
  removeTicketFromCartThunk,
} from "../../store/cart";
import { getItemsThunk } from "../../store/item";
import AddFavoriteForm from "../AddFavoriteForm";
import DeleteFavoriteModal from "../DeleteFavoriteModal";
import MapContainer from "../Maps";
import "./Tickets.css";

export default function Tickets() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const tickets = useSelector((state) => state.ticket.tickets);
  const cart = useSelector((state) => state.cart.cart);
  const teams = useSelector((state) => state.team.teams);
  const cartTickets = useSelector((state) => state.cart.cartTickets);
  const favorites = useSelector((state) => state.favorite.favorites);
  const usersFavorites = favorites?.filter((favorite) => favorite.user_id === user?.id);
  const userFavoritesTeams = usersFavorites?.map(favorite => favorite.teams)
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [adding, setAdding] = useState(false);
  const [slidePosition1, setSlidePosition1] = useState(0);
  const [slidePosition2, setSlidePosition2] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

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

  const addToCart = async (ticket) => {
    setAdding(true);
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
    setAdding(false);
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

  const getFavorite = (teams) => {
    return usersFavorites.filter(favorite => favorite.teams === teams)[0]
  }

  const ticketsArr1 = tickets.slice(0, tickets.length / 2).map((ticket, i) => (
    <div className="ticket-card" onClick={(e) => {
      e.stopPropagation();
      history.push(`/ticket/${ticket.id}`)
    }}>

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
          (!adding ? <button
            className="add-to-cart cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSlidePosition1(i);
              addToCart(ticket);
            }}
          >
            Add to cart
          </button> : <button className="add-to-cart cursor-pointer"              onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}>Cart Loading</button>)
      ) : (
        (!adding ? <button
          className="remove-from-cart cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setSlidePosition1(i);
            removeTicket(ticket);
          }}
        >
          Remove from cart
        </button> :
        <button
        className="remove-from-cart cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        Cart Loading
      </button>)
      ) : <></>}
                {( //if item does not belong to user, render one of the add or remove favorite buttons
                user ?
                  !userFavoritesTeams?.includes(ticket.match) ?
                  <OpenModalButton
                    className="favorite-button cursor-pointer"
                    buttonText={(<i className="far fa-heart test-heart"></i>)}
                    onticketClick={closeMenu}
                    modalComponent={<AddFavoriteForm type="Ticket" name={ticket.match}  img={ticket.ticket_img} teams={ticket.match} />}
                  /> :
                  //this needs to be a "delete favorite modal"
                  <OpenModalButton
                    className="unfavorite-button cursor-pointer"
                    buttonText={(<i className="fas fa-heart test-heart"></i>)}
                    onTicketClick={closeMenu}
                    modalComponent={<DeleteFavoriteModal favorite={getFavorite(ticket.match)} setSlidePosition={setSlidePosition1} index={i} />}
                  />
                : <></>
              )}
    </div>
  ));

  const ticketsArr2 = tickets.slice(tickets.length / 2).map((ticket, i) => (
    <div className="ticket-card" onClick={(e) => {
      e.stopPropagation();
      history.push(`/ticket/${ticket.id}`)
    }}>
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
          (!adding ? <button
            className="add-to-cart cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSlidePosition1(i);
              addToCart(ticket);
            }}
          >
            Add to cart
          </button> : <button className="add-to-cart cursor-pointer"              onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}>Cart Loading</button>)
      ) : (
        (!adding ? <button
          className="remove-from-cart cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setSlidePosition1(i);
            removeTicket(ticket);
          }}
        >
          Remove from cart
        </button> :
        <button
        className="remove-from-cart cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        Cart Loading
      </button>)
      ) : <></>}
                {( //if item does not belong to user, render one of the add or remove favorite buttons
                user ?
                  !userFavoritesTeams?.includes(ticket.match) ?
                  <OpenModalButton
                    className="favorite-button cursor-pointer"
                    buttonText={(<i className="far fa-heart test-heart"></i>)}
                    onticketClick={closeMenu}
                    modalComponent={<AddFavoriteForm type="Ticket" name={ticket.match}  img={ticket.ticket_img} teams={ticket.match} />}
                  /> :
                  //this needs to be a "delete favorite modal"
                  <OpenModalButton
                    className="unfavorite-button cursor-pointer"
                    buttonText={(<i className="fas fa-heart test-heart"></i>)}
                    onTicketClick={closeMenu}
                    modalComponent={<DeleteFavoriteModal favorite={getFavorite(ticket.match)} setSlidePosition={setSlidePosition1} index={i} />}
                  />
                : <></>
              )}
    </div>
  ));

  const responsive = {
    400: { items: 1 },
    1400: { items: 2 },
    // 1640: { items: 3 },
  };

  return (
    <div className="tickets-container">
      <div className="ticket-carousel">
        <AliceCarousel
          infinite
          mouseTracking
          preventEventOnTouchMove
          activeIndex={slidePosition1}
          responsive={responsive}
          items={ticketsArr1}
        />
        <AliceCarousel
          infinite
          mouseTracking
          preventEventOnTouchMove
          activeIndex={slidePosition2}
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
