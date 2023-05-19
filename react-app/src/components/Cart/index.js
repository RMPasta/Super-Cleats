import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, removeFromCartThunk } from '../../store/cart';
import './Cart.css'

export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);
    const cartItems = useSelector(state => state.cart.cartItems);
    const user = useSelector(state => state.session.user);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (user) {
            dispatch(getCartThunk(user.id))
        }
    }, [dispatch, user]);

    useEffect(() => {
      if (cart) setQuantity(cart.quantity)
      if (cart) setTotal(cart.total_price)
    }, [dispatch, cart]);

    const removeItem = async (item) => {
      const newQty = quantity - 1;
      const newTotalPrice = total - parseInt(item.price)
      await dispatch(removeFromCartThunk({id: cart.id, quantity: newQty, total_price: newTotalPrice, item_id: item.id}))
      await dispatch(getCartThunk(user.id))
    }

    if (!user) return <h2>Sign in to view cart</h2>
    if (!cart) return <h2>Sign in to view cart</h2>

  return (
    <div className='cart-container'>
        <div>{user.email}</div>
        <div>{cart.quantity} Items</div>
        <div className='map-container'>
          {cartItems && cartItems.map(item => (
            <div className='cart-item-info' key={item.id}>
              <div className="item-info">
              <div>{item.name}</div>
              <div>${item.price}</div>
              <img src={item.item_img} className='cart-item-image' alt={item.name} />
              </div>
              <i className="fa fa-trash cursor-pointer" id="cart-trash" onClick={() => removeItem(item)}></i>
            </div>
          ))}
        </div>
        <div className='checkout-section'>
          <div className="subtotal">Subtotal ${cart.total_price}</div>
          <button className='checkout-button cursor-pointer' onClick={() => "2"}>Checkout</button>
          <button className='add-items-button cursor-pointer' onClick={() => "5"}>Add Items</button>
        </div>
    </div>
  )
}
