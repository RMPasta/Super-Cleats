import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteItemThunk, getItemsThunk } from '../../store/item';
import './DeleteModal.css'

export default function DeleteModal({item, setSlidePosition, index}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [deleted, setDeleted] = useState(false)

    const handleDelete = async (itemId) => {
      setDeleted(3)
      const timeout1 = setTimeout(() => {
        setDeleted(2)
      }, [900])
      const timeout2 = setTimeout(() => {
        setDeleted(1)
      }, [1800])
      const timeout3 = setTimeout(async () => {
        await dispatch(deleteItemThunk(itemId))
        await dispatch(getItemsThunk())
        closeModal();
      }, [2700])
      setSlidePosition(index);
        return () => {
          clearTimeout(timeout1)
          clearTimeout(timeout2)
          clearTimeout(timeout3)
        }
      }
  return (
    <>
      <div className='delete-modal'>
        {!deleted ?
        <div>
          <p>Are You sure you want to delete this?</p>
          <div className='delete-buttons-container'>
              <button className='yes-button cursor-pointer' onClick={() => handleDelete(item.id)}>Yes</button>
              <button className='no-button cursor-pointer' onClick={() => closeModal()}>No</button>
          </div>
        </div> :
        <div>
          <div className='countdown'>{deleted}</div>
        </div>}
      </div>
    </>
  )
}
