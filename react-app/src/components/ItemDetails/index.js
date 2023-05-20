import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom'
import { getItemsThunk } from '../../store/item';
import { addToCartThunk, getCartThunk, removeFromCartThunk } from '../../store/cart';
import './ItemDetails.css'

export default function ItemDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const items = useSelector(state => state.item.items);
    const teams = useSelector(state => state.team.teams);
    const cart = useSelector(state => state.cart.cart);
    const cartItems = useSelector(state => state.cart.cartItems);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cart) setQuantity(cart.quantity)
        if (cart) setTotal(cart.total_price)
        dispatch(getItemsThunk())
    }, [dispatch, cart]);

    useEffect(() => {
        dispatch(getItemsThunk())
    }, [dispatch]);

    const addToCart = async (item) => {
        const newQty = quantity + 1;
        const newTotalPrice = total + parseInt(item.price)
        // pass in cart id for fetch request
        // send in cart id and item id to create the association
        await dispatch(addToCartThunk({id: cart.id, quantity: newQty, total_price: newTotalPrice, item_id: item.id}))
        await dispatch(getCartThunk(cart.id))
    }

    const removeItem = async (item) => {
        const newQty = quantity - 1;
        const newTotalPrice = total - parseInt(item.price)
        await dispatch(removeFromCartThunk({id: cart.id, quantity: newQty, total_price: newTotalPrice, item_id: item.id}))
        await dispatch(getCartThunk(user.id))
    }

    const getItemBadge = (item) => {
        const team = teams.find(team => team.id === item.team_id)
        return team.badge_img;
    }

    if (!items) return <h1>Loading...</h1>
    const item = items.find(item => item.id === parseInt(id));

    if (!item) return <h1>No such item.</h1>

  return (
    <div className='item-details-page'>
        <div className='back-container'>
            <div onClick={() => history.goBack()} className='cursor-pointer'><i className="fa fa-arrow-left"></i> Back</div>
        </div>
        <div className='item-details-container'>
            <img className='item-details-image' src={item.item_img} alt={item.name} />
            <div className='item-details-right'>
                <h3 className='item-name'>{item.name}</h3>
                <div className='price-and-badge'>
                    <div className='item-price'>${item.price}</div>
                    <img className="item-details-badge" src={getItemBadge(item)} alt="item-team-badge" />
                </div>
                {user && user.id !== item.user_id ?
                    cartItems && cartItems.filter(cartItem => cartItem.id === item.id).length === 0 ?
                    <button className='item-details-add cursor-pointer' onClick={() => {addToCart(item)}}>Add to cart - ${item.price}</button> :
                    <button className='item-details-remove cursor-pointer' onClick={() => {removeItem(item)}}>Remove from cart</button> :
                    user && <button className='add-items-button' onClick={(e) => {
                        e.stopPropagation();
                        history.push('/user')
                    }}>Manage Items</button>}
                <h4 className='item-description'>Description</h4>
                <div className='item-description'>{item.description}</div>
            </div>
        </div>
    </div>
  )
}
