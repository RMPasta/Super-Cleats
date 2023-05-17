import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from '../../store/cart';
import './Cart.css'

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (user) {
            dispatch(getCartThunk(user.id))
        }
    }, [dispatch, user]);

    if (!cart) return <h1>...Loading</h1>

  return (
    <div className='cart-container'>
        {
            user ?
            <div>{cart.id}</div> :
            <div>Log In</div>
        }

    </div>
  )
}
