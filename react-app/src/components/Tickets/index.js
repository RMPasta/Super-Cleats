import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsThunk } from "../../store/ticket";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import { addToCartThunk, getCartThunk, removeFromCartThunk} from "../../store/cart";
import MapContainer from "../Maps";
import "./Tickets.css";

export default function Tickets() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticket.tickets);
//   const user = useSelector((state) => state.session.user);
//   const cart = useSelector((state) => state.cart.cart);
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const teams = useSelector((state) => state.team.teams);
//   const [quantity, setQuantity] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [filtered, setFiltered] = useState(items);
//   const [slidePosition, setSlidePosition] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
    dispatch(getTicketsThunk());
}, [dispatch])

  if (!tickets) return <h1>Loading...</h1>;
  // if (!cart) return <h1>Loading...</h1>

  //   const handleDragStart = (e) => e.preventDefault();

//   const addToCart = async (item) => {
//     // e.preventDefault();
//     // e.stopPropagation();
//     const newQty = quantity + 1;
//     const newTotalPrice = total + parseInt(item.price);
//     // pass in cart id for fetch request
//     // send in cart id and item id to create the association
//     await dispatch(
//       addToCartThunk({
//         id: cart.id,
//         quantity: newQty,
//         total_price: newTotalPrice,
//         item_id: item.id,
//       })
//     );
//     await dispatch(getCartThunk(cart.id));
//   };

//   const removeItem = async (item) => {
//     const newQty = quantity - 1;
//     const newTotalPrice = total - parseInt(item.price);
//     await dispatch(
//       removeFromCartThunk({
//         id: cart.id,
//         quantity: newQty,
//         total_price: newTotalPrice,
//         item_id: item.id,
//       })
//     );
//     await dispatch(getCartThunk(user.id));
//   };

//   const getItemBadge = (item) => {
//     if (teams && item) {
//       const team = teams.find((team) => team.id === item.team_id);
//       return team.badge_img;
//     }
//   };

    const ticketsArr = tickets.map((ticket) => (
        <div className="ticket-card">
            <div className="stadium">Stadium: {ticket.stadium}</div>
            <div>Stadium Capacity: {ticket.capacity}</div>
            <div>Match: {ticket.match}</div>
            <div>Price: ${ticket.price}</div>
            <div>Event: {ticket.event_date}</div>
        </div>
    ));


  const responsive = {
    300: { items: 1 },
    1000: { items: 2 },
    1300: { items: 3 },
    1700: { items: 4 },
    // 1600: { items: 5 },
  };

  return (
    <div className="tickets-container">
      {/* <div className="item-gallery">
        {filtered?.length > 0 ?
          <AliceCarousel
          infinite
          mouseTracking
          preventEventOnTouchMove
          disableDotsControls={isMobile}
          activeIndex={slidePosition}
          responsive={responsive}
          items={filteredArr}
          /> :
          <div className="no-filter-found">Nothing with this combo, adjust the filters!</div>}
        </div> */}
      <div className="ticket-carousel">
        <AliceCarousel
            infinite
            mouseTracking
            preventEventOnTouchMove
            // activeIndex={slidePosition}
            responsive={responsive}
            items={ticketsArr}
        />
      </div>
        <div>
          <MapContainer />
        </div>
    </div>
  );
}
