import React from 'react'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteItemThunk, getItemsThunk } from '../../store/item';
import './DeleteModal.css'

export default function DeleteModal({item}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async (itemId) => {
        await dispatch(deleteItemThunk(itemId))
        await dispatch(getItemsThunk())
        closeModal();
    }
  return (
    <div className='delete-modal'>
        <p>Are You sure you want to delete this?</p>
        <div className='delete-buttons-container'>
            <button className='yes-button cursor-pointer' onClick={() => handleDelete(item.id)}>Yes</button>
            <button className='no-button cursor-pointer' onClick={() => closeModal()}>No</button>
        </div>
    </div>
  )
}
