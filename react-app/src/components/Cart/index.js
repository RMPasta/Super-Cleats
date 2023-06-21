import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  clearCartThunk,
  getCartThunk,
  removeFromCartThunk,
  removeTicketFromCartThunk,
} from "../../store/cart";
import CheckOutModal from "../CheckOutModal";
import OpenModalButton from "../OpenModalButton";
import "./Cart.css";

export default function Cart({ setShowMenu }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTickets = useSelector((state) => state.cart.cartTickets);
  const user = useSelector((state) => state.session.user);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [isNotMobile, setIsNotMobile] = useState(true);

  // JAVASCRIPT MEDIA QUERY
  useEffect(() => {
    const mQuery = window.matchMedia("(max-width: 600px)");
    function handleMobileSize(e) {
      // Check if the media query is true
      if (e.matches) {
        setIsNotMobile(false);
        return;
      }
      setIsNotMobile(true);
      return;
    }
    // Set up event listener
    mQuery.addListener(handleMobileSize);
    return () => {
      mQuery.removeListener(handleMobileSize);
    };
  }, [isNotMobile]);

  useEffect(() => {
    if (user) {
      dispatch(getCartThunk(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (cart) setQuantity(cart.quantity);
    if (cart) setTotal(cart.total_price);
  }, [dispatch, cart]);

  const closeMenu = () => setShowMenu(false);

  const removeItem = async (item) => {
    const newQty = quantity - 1;
    const newTotalPrice = total - parseInt(item.price);
    await dispatch(
      removeFromCartThunk({
        id: cart.id,
        quantity: newQty,
        total_price: newTotalPrice,
        item_id: item.id,
      })
    );
    await dispatch(getCartThunk(user.id));
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
    await dispatch(getCartThunk(user.id));
  };

  if (!user) return <h2>Sign in to view cart</h2>;
  if (!cart) return <h2>Sign in to view cart</h2>;

  return (
    <div className="cart-container">
      <div className="user-cart-info">
        <div className="user-cart-info-text">
          <div>{user.email}</div>
          <div>{cart.quantity} Items</div>
        </div>
      </div>
      <div className="map-container  scrollable-y">
        {cartItems &&
          cartItems.map((item) => {
            let clicked = false;
            return (
              <div
                className="cart-item-info cursor-pointer"
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
                  {!clicked ?
                  <i
                  className="fa fa-trash cursor-pointer"
                  id="cart-trash"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item);
                  }}
                ></i> :
                <i
                className="fa fa-trash cursor-pointer"
                id="cart-trash"
                ></i>}
                </div>
              </div>
            )
          })}
        {cartTickets &&
          cartTickets.map((ticket) => {
            let clicked = false;
            return (
              <div
                className="cart-item-info cursor-pointer"
                key={ticket.id}
                // onClick={() => {
                //   history.push(`/item/${item.id}`);
                //   setShowMenu(false);
                // }}
              >
                <div className="item-info">
                  <div>{ticket.match}</div>
                </div>
                <div className="image-trash-container">
                  <div>${ticket.price}</div>
                  <img
                    src={ticket.ticket_img}
                    className="cart-item-image"
                    alt={ticket.match}
                  />
                  {!clicked ?
                  <i
                  className="fa fa-trash cursor-pointer"
                  id="cart-trash"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTicket(ticket);
                  }}
                ></i> :
                <i
                className="fa fa-trash cursor-pointer"
                id="cart-trash"
                ></i>}
                </div>
              </div>
            )
          })}
      </div>
      <div className="subtotal-container">
        <div className="subtotal">Subtotal</div>
        <div className="subtotal">${cart.total_price}</div>
      </div>
      <div className="checkout-section">
        {cartItems?.length > 0 || cartTickets?.length > 0 ? (
          <OpenModalButton
            className="checkout-button cursor-pointer"
            buttonText="Check Out"
            onItemClick={closeMenu}
            modalComponent={
              <CheckOutModal isNotMobile={isNotMobile} closeMenu={closeMenu} />
            }
          />
        ) : (
          <button disabled className="checkout-button-disabled">
            Check Out
          </button>
        )}
        <button
          className="add-items-button cursor-pointer"
          onClick={() => {
            history.push("/");
            setShowMenu();
          }}
        >
          Add Items
        </button>
        <button
          className="clear-button cursor-pointer"
          onClick={async () => {
            await dispatch(clearCartThunk(cart.id));
            await dispatch(getCartThunk(cart.id));
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
