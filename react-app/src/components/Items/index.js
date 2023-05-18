import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getItemsThunk } from '../../store/item';
import './Items.css'

export default function Items() {
    const dispatch = useDispatch();
    const items = useSelector(state => state.item.items);

    useEffect(() => {
        dispatch(getItemsThunk())
    }, [dispatch]);

    if (!items) return <h1>...Loading</h1>

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
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
