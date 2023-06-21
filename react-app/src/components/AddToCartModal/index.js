import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import { deleteFavoriteThunk, getFavoritesThunk } from '../../store/favorite';
// import './DeleteFavoriteModal.css'

export default function DeleteFavoriteModal({favorite, setSlidePosition, index}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [added, setDeleted] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [confirmedDisplay, setConfirmedDisplay] = useState("hidden");

    const handleDelete = async (itemId) => {
      setDeleted(3)
      const timeout1 = setTimeout(() => {
        setDeleted(2)
      }, [700])
      const timeout2 = setTimeout(() => {
        setDeleted(1)
      }, [1400])
      const timeout3 = setTimeout(async () => {
        setConfirmed(true)
        await dispatch(deleteFavoriteThunk(itemId))
        await dispatch(getFavoritesThunk())
      }, [2100])
      const timeout4 = setTimeout(async () => {
        setConfirmedDisplay("confirmed")
      }, [2000])
      const timeout5 = setTimeout(async () => {
        closeModal();
      }, [3000])
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
            <p>Are you sure you want to unfavorite this?</p>
            <div className='delete-buttons-container'>
                <button className='yes-button cursor-pointer' onClick={() => handleDelete(favorite.id)}>Yes</button>
                <button className='no-button cursor-pointer' onClick={() => closeModal()}>No</button>
            </div>
            </div> :
            <div>
                {!confirmed ?
                <div className='countdown'>{deleted}</div> :
                <i alt="confirmation" className={confirmedDisplay + " fas fa-check"} ></i>}
            </div>}
      </div>
    </>
  )
}
