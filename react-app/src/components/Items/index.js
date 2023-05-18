import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getItemsThunk } from '../../store/item';
import { editCartThunk } from '../../store/cart';
import './Items.css'

export default function Items() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);
    const user = useSelector(state => state.session.user);
    const storeCart = useSelector(state => state.cart.cart);
    const cart = storeCart?.cart;
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cart) setQuantity(cart.quantity)
        if (cart) setTotal(cart.total_price)
        dispatch(getItemsThunk())
    }, [dispatch, cart]);

    if (!items) return <h1>Loading...</h1>
    if (!cart) return <h1>Loading...</h1>

    const addToCart = async (item) => {
        const newQty = quantity + 1;
        const newTotalPrice = total + parseInt(item.price)
        // pass in cart id for fetch request
        // send in user id and item id to create the association
        await dispatch(editCartThunk({id: cart.id, quantity: newQty, total_price: newTotalPrice, item_id: item.id}))
    }

  return (
    <div className='gallery-container'>
        <div className='item-gallery'>
            <h2 className='type-header'>Cleats</h2>
            <div className='cleats-gallery scrollable-x'>
                {items.filter(item => item.type === "cleats").map((item) => (
                    <div key={item.id} className='item-card'>
                        <img className='card-img' src={item.item_img} alt={item.name} />
                        <div>{item.name}</div>
                        <div>$ {item.price}</div>
                        <div>{item.description}</div>
                        {user && user.id !== item.user_id ?
                        <button onClick={() => {addToCart(item)}}>Add to cart</button> :
                        <NavLink to="/user">Manage Items</NavLink>}
                    </div>
                ))}
            </div>
            <h2 className='type-header'>Socks</h2>
            <div className='socks-gallery scrollable-x'>
                {items.filter(item => item.type === "socks").map((item) => (
                    <div key={item.id} className='item-card'>
                        <img className='card-img' src={item.item_img} alt={item.name} />
                        <div>{item.name}</div>
                        <div>$ {item.price}</div>
                        <div>{item.description}</div>
                        {user && user.id !== item.user_id ?
                        <button onClick={() => {addToCart(item)}}>Add to cart</button> :
                        <NavLink to="/user">Manage Items</NavLink>}
                    </div>
                ))}
            </div>
            <h2 className='type-header'>Soccer Balls</h2>
            <div className='ball-gallery scrollable-x'>
                {items.filter(item => item.type === "ball").map((item) => (
                    <div key={item.id} className='item-card'>
                        <img className='card-img' src={item.item_img} alt={item.name} />
                        <div>{item.name}</div>
                        <div>$ {item.price}</div>
                        <div>{item.description}</div>
                        {user && user.id !== item.user_id ?
                        <button onClick={() => {addToCart(item)}}>Add to cart</button> :
                        <NavLink to="/user">Manage Items</NavLink>}
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
