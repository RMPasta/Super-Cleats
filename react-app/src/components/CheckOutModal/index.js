import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { clearCartThunk, getCartThunk } from "../../store/cart";
import "./CheckOutModal.css";

export default function CheckOutModal({ isNotMobile, closeMenu }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (!isNotMobile) {
      closeMenu();
    }
    const timeout1 = setTimeout(() => {
      setLoading(false);
    }, [3000]);
    const timeout2 = setTimeout(async () => {
      await dispatch(clearCartThunk(cart.id));
      await dispatch(getCartThunk(cart.id));
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
