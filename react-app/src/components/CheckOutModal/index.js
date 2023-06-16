import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { clearCartThunk, getCartThunk } from "../../store/cart";
import "./CheckOutModal.css";
import { addPurchaseThunk, getPurchasesThunk } from "../../store/purchase";

export default function CheckOutModal({ isNotMobile, closeMenu }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTickets = useSelector((state) => state.cart.cartTickets);

  useEffect(() => {
    if (!isNotMobile) {
      closeMenu();
    }
    const timeout1 = setTimeout(() => {


      cartItems.forEach(item => {
        const formData = new FormData();
        formData.append("price", Number(item.price));
        formData.append("order", Number(1));
        formData.append("item_id", item.id);
        dispatch(addPurchaseThunk(formData))
      })
      cartTickets.forEach(ticket => {
        const formData = new FormData();
        formData.append("price", Number(ticket.price));
        formData.append("order", Number(1));
        formData.append("ticket_id", ticket.id);
        dispatch(addPurchaseThunk(formData))
      })
      setLoading(false);
    }, [3000]);
    const timeout2 = setTimeout(async () => {
      await dispatch(clearCartThunk(cart.id));
      await dispatch(getCartThunk(cart.id));
      await dispatch(getPurchasesThunk())
      closeModal();
      closeMenu();
    }, [5000]);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      // clearTimeout(timeout3);
    };
  }, [closeMenu, closeModal, cart, dispatch, isNotMobile]);

  return (
    <div className="checkout-confirm">
      {loading ? (
        <div className="confirming-modal">Confirming transaction...</div>
      ) : (
        <div>Super Cleats thanks you!</div>
      )}
      {loading ? (
        // <i className="fa fa-spinner fa-spin-pulse" id="spinner"></i>
        <i className="fas fa-spinner fa-pulse" id="spinner"></i>
      ) : (
        <i className="fas fa-check" id="check"></i>
      )}
    </div>
  );
}
