import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom'
import { getTicketsThunk } from '../../store/ticket';
import { addTicketToCartThunk, addToCartThunk, getCartThunk, removeFromCartThunk, removeTicketFromCartThunk } from '../../store/cart';
import OpenModalButton from "../OpenModalButton";
import AddFavoriteForm from "../AddFavoriteForm";
import DeleteFavoriteModal from "../DeleteFavoriteModal";
import './TicketDetails.css'

export default function TicketDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const tickets = useSelector(state => state.ticket.tickets);
    const teams = useSelector(state => state.team.teams);
    const favorites = useSelector((state) => state.favorite.favorites);
    const usersFavorites = favorites?.filter((favorite) => favorite.user_id === user?.id);
    const userFavoritesTeams = usersFavorites?.map(favorite => favorite.teams)
    const cart = useSelector(state => state.cart.cart);
    const cartTickets = useSelector(state => state.cart.cartTickets);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        if (cart) setQuantity(cart.quantity)
        if (cart) setTotal(cart.total_price)
        dispatch(getTicketsThunk())
    }, [dispatch, cart]);

    useEffect(() => {
        dispatch(getTicketsThunk())
    }, [dispatch]);

    const addToCart = async (item) => {
        const newQty = quantity + 1;
        const newTotalPrice = total + parseInt(item.price)
        // pass in cart id for fetch request
        // send in cart id and item id to create the association
        await dispatch(addTicketToCartThunk({id: cart.id, quantity: newQty, total_price: newTotalPrice, ticket_id: ticket.id}))
        await dispatch(getCartThunk(cart.id))
    }

    const removeTicket = async (item) => {
        const newQty = quantity - 1;
        const newTotalPrice = total - parseInt(item.price)
        await dispatch(removeTicketFromCartThunk({id: cart.id, quantity: newQty, total_price: newTotalPrice, ticket_id: ticket.id}))
        await dispatch(getCartThunk(user.id))
    }

    // const getItemBadge = (item) => {
    //     const team = teams.find(team => team.id === item.team_id)
    //     return team.badge_img;
    // }

    // const getItemTeam = (item) => {
    //     if (teams && item) {
    //       const team = teams.find((team) => team.id === item.team_id);
    //       return team;
    //     }
    //   };

    const getFavorite = (teams) => {
        return usersFavorites.filter(favorite => favorite.teams === teams)[0]
      }

      //declaring these to pass props as a bug fix
      const setSlidePosition = (arg) => {
        return arg;
      }
      const i = 0;


    if (!tickets) return <h1>Loading...</h1>
    const ticket = tickets.find(ticket => ticket.id === parseInt(id));

    if (!ticket) return <h1>No such ticket.</h1>

  return (
    <div className='ticket-details-page'>
        <div className='back-container'>
            <div onClick={() => history.goBack()} className='cursor-pointer'><i className="fa fa-arrow-left"></i> Back</div>
        </div>
                    <div className='heart-container'>
                        {( //if item does not belong to user, render one of the add or remove favorite buttons
                            user ?
                            !userFavoritesTeams?.includes(ticket.match) ?
                            <OpenModalButton
                                className="favorite-button cursor-pointer"
                                buttonText={(<i className="far fa-heart test-heart"></i>)}
                                onticketClick={closeMenu}
                                modalComponent={<AddFavoriteForm type="Ticket" name={ticket.match}  img={ticket.ticket_img} teams={ticket.match} />}
                            /> :
                            //this needs to be a "delete favorite modal"
                            <OpenModalButton
                                className="unfavorite-button cursor-pointer"
                                buttonText={(<i className="fas fa-heart test-heart"></i>)}
                                onTicketClick={closeMenu}
                                modalComponent={<DeleteFavoriteModal favorite={getFavorite(ticket.match)} setSlidePosition={setSlidePosition} index={i} />}
                            />
                            : <></>
                        )}
                    </div>
        <div className='ticket-details-container'>
            <img className='ticket-details-image' src={ticket.ticket_img} alt={ticket.name} />
            <div className='ticket-details-right'>
                    <h3 className='ticket-name'>{ticket.name}</h3>
                <h4 className='ticket-description'>{ticket.stadium}</h4>
                <div className='price-and-badge'>
                    <div className='ticket-price'>${ticket.price}</div>
                    <div className='ticket-description'>{ticket.match}</div>
                    {/* <img className="ticket-details-badge" src={ticket.ticket_img} alt="ticket-team-badge" /> */}
                </div>
                {user && user.id !== ticket.user_id ?
                    cartTickets && cartTickets.filter(cartTicket => cartTicket.id === ticket.id).length === 0 ?
                    <button className='item-details-add cursor-pointer' onClick={() => {addToCart(ticket)}}>Add to cart - ${ticket.price}</button> :
                    <button className='item-details-remove cursor-pointer' onClick={() => {removeTicket(ticket)}}>Remove from cart</button> :
                    user && <button className='add-items-button' onClick={(e) => {
                        e.stopPropagation();
                        history.push('/user')
                    }}>Manage tickets</button>}
            </div>
        </div>
    </div>
  )
}
