import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getItemsThunk } from '../../store/item';
import { addToCartThunk, getCartThunk, removeFromCartThunk } from '../../store/cart';
import './Items.css'

export default function Items() {
    const dispatch = useDispatch();
    const history = useHistory();
    const items = useSelector(state => state.item.items);
    const user = useSelector(state => state.session.user);
    const cart = useSelector(state => state.cart.cart);
    const cartItems = useSelector(state => state.cart.cartItems);
    const teams = useSelector(state => state.team.teams);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (cart) setQuantity(cart.quantity)
        if (cart) setTotal(cart.total_price)
        dispatch(getItemsThunk())
    }, [dispatch, cart]);

    if (!items) return <h1>Loading...</h1>
    // if (!cart) return <h1>Loading...</h1>

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

  return (
    <div className='gallery-container'>
        <div className='item-gallery'>
            <h2 className='type-header'>Cleats</h2>
            <div className='cleats-gallery scrollable-x'>
                {items.filter(item => item.type === "cleats").map((item) => (
                    <div key={item.id} className='item-card' onClick={() => history.push(`/item/${item.id}`)}>
                        <img className="card-badge" src={getItemBadge(item)} alt="item-team-badge" />
                        <img className='card-img' src={item.item_img} alt={item.name} />
                        <div className='item-card-info'>
                            <div>{item.name}</div>
                            <div>$ {item.price}</div>
                            <div>{item.description.length > 30 ? item.description.slice(0, 30) + "..." : item.description}</div>
                        </div>
                        {user && user.id !== item.user_id ?
                        cartItems && cartItems.filter(cartItem => cartItem.id === item.id).length === 0 ?
                        <button className='checkout-button' onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item)
                        }}>Add to cart</button> :
                        <button className='add-items-button' onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item)
                        }}>Remove from cart</button> :
                        user && <button className='add-items-button' onClick={(e) => {
                            e.stopPropagation();
                            history.push('/user')
                        }}>Manage Items</button>}
                    </div>
                ))}
            </div>
            <h2 className='type-header'>Socks</h2>
            <div className='socks-gallery scrollable-x'>
                {items.filter(item => item.type === "socks").map((item) => (
                    <div key={item.id} className='item-card' onClick={() => history.push(`/item/${item.id}`)}>
                        <img className="card-badge" src={getItemBadge(item)} alt="item-team-badge" />
                        <img className='card-img' src={item.item_img} alt={item.name} />
                        <div className='item-card-info'>
                            <div>{item.name}</div>
                            <div>$ {item.price}</div>
                            <div>{item.description}</div>
                            {user && user.id !== item.user_id ?
                            cartItems && cartItems.filter(cartItem => cartItem.id === item.id).length === 0 ?
                            <button className='checkout-button' onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item)
                            }}>Add to cart</button> :
                            <button className='add-items-button' onClick={(e) => {
                                e.stopPropagation();
                                removeItem(item)
                            }}>Remove from cart</button> :
                            user && <button className='add-items-button' onClick={(e) => {
                                e.stopPropagation();
                                history.push('/user')
                            }}>Manage Items</button>}
                        </div>
                    </div>
                ))}
            </div>
            <h2 className='type-header'>Soccer Balls</h2>
            <div className='ball-gallery scrollable-x'>
                {items.filter(item => item.type === "ball").map((item) => (
                    <div key={item.id} className='item-card' onClick={() => history.push(`/item/${item.id}`)}>
                        <img className="card-badge" src={getItemBadge(item)} alt="item-team-badge" />
                        <img className='card-img' src={item.item_img} alt={item.name} />
                        <div className='item-card-info'>
                            <div>{item.name}</div>
                            <div>$ {item.price}</div>
                            <div>{item.description}</div>
                            {user && user.id !== item.user_id ?
                            cartItems && cartItems.filter(cartItem => cartItem.id === item.id).length === 0 ?
                            <button className='checkout-button' onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item)
                            }}>Add to cart</button> :
                            <button className='add-items-button' onClick={(e) => {
                                e.stopPropagation();
                                removeItem(item)
                            }}>Remove from cart</button> :
                            user && <button className='add-items-button' onClick={(e) => {
                                e.stopPropagation();
                                history.push('/user')
                            }}>Manage Items</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
