import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getItemsThunk } from '../../store/item';
import OpenModalButton from "../OpenModalButton";
import EditItemForm from '../EditItemForm';
import DeleteModal from '../DeleteModal';
import './UsersItems.css'

export default function UsersItems() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const items = useSelector(state => state.item.items);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (!user) return history.push('/')
        dispatch(getItemsThunk())
    }, [dispatch, history, user]);

    if (!items) return <h1>...Loading</h1>
    if (!user) return <></>

    const usersItems = items.filter(item => item.user_id === user.id)
    const closeMenu = () => setShowMenu(false);

  return (
    <div className='gallery-container'>
        <div className='item-gallery'>
            <h2 className='type-header'>Users Items</h2>
            <div className='cleats-gallery scrollable-x'>
                {usersItems.map((item) => (
                    <div key={item.id} className='item-card'>
                        <img className='card-img' src={item.item_img} alt={item.name} />
                        <div className='item-card-info'>
                            <div>{item.name}</div>
                            <div>$ {item.price}</div>
                            <div>{item.description}</div>
                            <OpenModalButton
                                buttonText="Edit"
                                onItemClick={closeMenu}
                                modalComponent={<EditItemForm item={item} showMenu={showMenu} />}
					        />
                            <OpenModalButton
                                buttonText="Delete"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteModal item={item} showMenu={showMenu} />}
					        />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
