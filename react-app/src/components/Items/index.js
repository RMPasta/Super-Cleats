import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getItemsThunk } from "../../store/item";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  addToCartThunk,
  getCartThunk,
  removeFromCartThunk,
} from "../../store/cart";
import "./Items.css";

export default function Items() {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector((state) => state.item.items);
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const teams = useSelector((state) => state.team.teams);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [isCarouselReady, setIsCarouselReady] = useState(false);

  useEffect(() => {
    if (cart) setQuantity(cart.quantity);
    if (cart) setTotal(cart.total_price);
    dispatch(getItemsThunk());
  }, [dispatch, cart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarouselReady(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!items) return <h1>Loading...</h1>;
  // if (!cart) return <h1>Loading...</h1>

  //   const handleDragStart = (e) => e.preventDefault();

  const addToCart = async (item) => {
    const newQty = quantity + 1;
    const newTotalPrice = total + parseInt(item.price);
    // pass in cart id for fetch request
    // send in cart id and item id to create the association
    await dispatch(
      addToCartThunk({
        id: cart.id,
        quantity: newQty,
        total_price: newTotalPrice,
        item_id: item.id,
      })
    );
    await dispatch(getCartThunk(cart.id));
  };

  const removeItem = async (item) => {
    const newQty = quantity - 1;
    const newTotalPrice = total - parseInt(item.price);
    await dispatch(
      removeFromCartThunk({
        id: cart.id,
        quantity: newQty,
        total_price: newTotalPrice,
        item_id: item.id,
      })
    );
    await dispatch(getCartThunk(user.id));
  };

  const getItemBadge = (item) => {
    if (teams) {
      const team = teams.find((team) => team.id === item.team_id);
      return team.badge_img;
    }
  };
  // CLEATS ARRAY FOR ALICE CAROUSEL
  const cleatsArr = items
    .filter((item) => item.type === "cleats")
    .map((item) => (
      <div
        style={{ width: "240px", overflowY: "none" }}
        key={item.id}
        className="item-card cursor-pointer"
        onClick={() => history.push(`/item/${item.id}`)}
      >
        <img
          className="card-badge"
          src={getItemBadge(item)}
          alt="item-team-badge"
        />
        <img className="card-img" src={item.item_img} alt={item.name} />
        <div className="item-card-info">
          <div>{item.name}</div>
          <div>$ {item.price}</div>
          <div>
            {item.description.length > 30
              ? item.description.slice(0, 30) + "..."
              : item.description}
          </div>
        </div>
        {user && user.id !== item.user_id ? (
          cartItems &&
          cartItems.filter((cartItem) => cartItem.id === item.id).length ===
            0 ? (
            <button
              className="checkout-button cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(item);
              }}
            >
              Add to cart
            </button>
          ) : (
            <button
              className="add-items-button cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item);
              }}
            >
              Remove from cart
            </button>
          )
        ) : (
          user && (
            <button
              className="add-items-button cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                history.push("/user");
              }}
            >
              Manage Items
            </button>
          )
        )}
      </div>
    ));

  // SOCKS ARRAY FOR ALICE CAROUSEL
  const socksArr = items
    .filter((item) => item.type === "socks")
    .map((item) => (
      <div
        style={{ width: "240px" }}
        key={item.id}
        className="item-card cursor-pointer"
        onClick={() => history.push(`/item/${item.id}`)}
      >
        <img
          className="card-badge"
          src={getItemBadge(item)}
          alt="item-team-badge"
        />
        <img className="card-img" src={item.item_img} alt={item.name} />
        <div className="item-card-info">
          <div>{item.name}</div>
          <div>$ {item.price}</div>
          <div>
            {item.description.length > 30
              ? item.description.slice(0, 30) + "..."
              : item.description}
          </div>
          {user && user.id !== item.user_id ? (
            cartItems &&
            cartItems.filter((cartItem) => cartItem.id === item.id).length ===
              0 ? (
              <button
                className="checkout-button cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                Add to cart
              </button>
            ) : (
              <button
                className="add-items-button cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item);
                }}
              >
                Remove from cart
              </button>
            )
          ) : (
            user && (
              <button
                className="add-items-button cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push("/user");
                }}
              >
                Manage Items
              </button>
            )
          )}
        </div>
      </div>
    ));

  // BALL ARRAY FOR ALICE CAROUSEL
  const ballArr = items
    .filter((item) => item.type === "ball")
    .map((item) => (
      <div
        style={{ width: "240px" }}
        key={item.id}
        className="item-card cursor-pointer"
        onClick={() => history.push(`/item/${item.id}`)}
      >
        <img
          className="card-badge"
          src={getItemBadge(item)}
          alt="item-team-badge"
        />
        <img className="card-img" src={item.item_img} alt={item.name} />
        <div className="item-card-info">
          <div>{item.name}</div>
          <div>$ {item.price}</div>
          <div>
            {item.description.length > 30
              ? item.description.slice(0, 30) + "..."
              : item.description}
          </div>
          {user && user.id !== item.user_id ? (
            cartItems &&
            cartItems.filter((cartItem) => cartItem.id === item.id).length ===
              0 ? (
              <button
                className="checkout-button cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                Add to cart
              </button>
            ) : (
              <button
                className="add-items-button cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item);
                }}
              >
                Remove from cart
              </button>
            )
          ) : (
            user && (
              <button
                className="add-items-button cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  history.push("/user");
                }}
              >
                Manage Items
              </button>
            )
          )}
        </div>
      </div>
    ));

  const responsive = {
    400: { items: 1 },
    900: { items: 2 },
    1100: { items: 3 },
    1600: { items: 4 },
    1800: { items: 5 },
  };

  return (
    <div className="gallery-container">
      <div className="item-gallery">
        <h2 className="type-header">Cleats</h2>
        <div className="cleats-gallery scrollable-x">
          <AliceCarousel
            infinite
            mouseTracking
            touchMoveDefaultEvents={false}
            preventEventOnTouchMove
            responsive={responsive}
            items={cleatsArr}
          />
        </div>
        <h2 className="type-header">Socks</h2>
        <div className="socks-gallery scrollable-x">
          <AliceCarousel
            infinite
            mouseTracking
            touchMoveDefaultEvents={false}
            preventEventOnTouchMove
            responsive={responsive}
            items={socksArr}
          />
        </div>
        <h2 className="type-header">Soccer Balls</h2>
        <div className="ball-gallery scrollable-x">
          <AliceCarousel
            infinite
            mouseTracking
            touchMoveDefaultEvents={false}
            preventEventOnTouchMove
            responsive={responsive}
            items={ballArr}
          />
        </div>
      </div>
    </div>
  );
}
