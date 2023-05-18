import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteItemThunk, getItemsThunk } from '../../store/item';
// import './UsersItems.css'

export default function UsersItems() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getItemsThunk())
    }, [dispatch]);

    const handleDelete = async (itemId) => {
        await dispatch(deleteItemThunk(itemId))
        await dispatch(getItemsThunk())
    }

    if (!items) return <h1>...Loading</h1>
    const usersItems = items.filter(item => item.user_id === user.id)
  return (
    <div className='item-gallery'>
        <h2 className='type-header'>Users Items</h2>
        <div className='cleats-gallery'>
            {usersItems.map((item) => (
                <div key={item.id} className='item-card'>
                    <img className='card-img' src={item.item_img} alt={item.name} />
                    <div>{item.name}</div>
                    <div>$ {item.price}</div>
                    <div>{item.description}</div>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            ))}
        </div>
    </div>
  )
}
