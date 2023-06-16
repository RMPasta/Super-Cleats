import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteItemThunk, getItemsThunk } from '../../store/item';
import gif from './giphy.gif';
import './DeleteModal.css'

export default function DeleteModal({item, setSlidePosition, index}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [deleted, setDeleted] = useState(false)
    const [explosion, setExplosion] = useState(false)
    const [explosionDisplay, setExplosionDisplay] = useState("hidden")

    const handleDelete = async (itemId) => {
      setDeleted(3)
      const timeout1 = setTimeout(() => {
        setDeleted(2)
      }, [900])
      const timeout2 = setTimeout(() => {
        setDeleted(1)
      }, [1800])
      const timeout3 = setTimeout(async () => {
        setExplosion(true)
        await dispatch(deleteItemThunk(itemId))
        await dispatch(getItemsThunk())
      }, [2700])
      const timeout4 = setTimeout(async () => {
        setExplosionDisplay("explosion")
      }, [2400])
      const timeout5 = setTimeout(async () => {
        closeModal();
      }, [5500])
      setSlidePosition(index);
        return () => {
          clearTimeout(timeout1)
          clearTimeout(timeout2)
          clearTimeout(timeout3)
          clearTimeout(timeout4)
          clearTimeout(timeout5)
        }
      }
  return (
    <>
      <div className='delete-modal'>
        {!deleted ?
        <div>
          <p>Are you sure you want to delete this?</p>
          <div className='delete-buttons-container'>
              <button className='yes-button cursor-pointer' onClick={() => handleDelete(item.id)}>Yes</button>
              <button className='no-button cursor-pointer' onClick={() => closeModal()}>No</button>
          </div>
        </div> :
        <div>
          {!explosion ?
          <div className='countdown'>{deleted}</div> :
          <img src={gif} alt="explosion" className={explosionDisplay} />}
        </div>}
      </div>
    </>
  )
}
