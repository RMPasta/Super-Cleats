import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from '../../store/cart';
import './Cart.css'

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const cartItems = useSelector(state => state.cart.cartItems);
    const user = useSelector(state => state.session.user);
    useEffect(() => {
        if (user) {
            dispatch(getCartThunk(user.id))
        }
    }, [dispatch, user]);

    if (!user) return <h2>Sign in to view cart</h2>
    if (!cart) return <h2>Sign in to view cart</h2>

  return (
    <div className='cart-container'>
        <div>{user.email}</div>
        <div>{cart.quantity} Items</div>
        <div>$ {cart.total_price} Total</div>
        {cartItems && cartItems.map(item => (
          <div key={item.id}>
            <div>{item.name}</div>
          </div>
        ))}
    </div>
  )
}
