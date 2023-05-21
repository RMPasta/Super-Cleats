import React, { useEffect, useState } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch, useSelector } from "react-redux";
import { clearCartThunk, getCartThunk } from '../../store/cart';
import './CheckOutModal.css';

export default function CheckOutModal({ closeMenu }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [loading, setLoading] = useState(true);
    const cart = useSelector(state => state.cart.cart);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, [3000])
        setTimeout(async () => {
            await dispatch(clearCartThunk(cart.id))
            await dispatch(getCartThunk(cart.id))
            closeModal()
        }, [5000])
        setTimeout(() => {
            closeMenu()
        }, [6000])
        return () => {
            clearTimeout()
        }
    }, [closeMenu, closeModal, cart, dispatch])

  return (
    <div className='checkout-confirm'>
        {loading ?
         <div>Confirming transaction...</div> :
         <div>Super Cleats thanks you!</div>}
        {loading ?
        <i className="fa fa-spinner fa-spin-pulse" id="spinner"></i> :
        <i className="fa fa-check" id="check"></i>}
    </div>
  )
}
