import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getItemsThunk } from "../../store/item";
import AliceCarousel from "react-alice-carousel";
import OpenModalButton from "../OpenModalButton";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  addToCartThunk,
  getCartThunk,
  removeFromCartThunk,
} from "../../store/cart";
import "./Items.css";
import AddFavoriteForm from "../AddFavoriteForm";

export default function Items({ typeFilter, priceFilter, teamFilter }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector((state) => state.item.items);
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const teams = useSelector((state) => state.team.teams);
  const favorites = useSelector((state) => state.favorite.favorites);
  const usersFavorites = favorites?.filter((favorite) => favorite.user_id === user?.id);
  const userFavoritesNames = usersFavorites?.map(favorite => favorite.name)
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [filtered, setFiltered] = useState(items);
  const [slidePosition, setSlidePosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  // JAVASCRIPT MEDIA QUERY
  useEffect(() => {
    const mQuery = window.matchMedia("(max-width: 600px)");
    function handleMobileSize(e) {
      // Check if the media query is true
      if (e.matches) {
        setIsMobile(true);
        return;
      }
      setIsMobile(false);
      return;
    }
    // Set up event listener
    mQuery.addListener(handleMobileSize);
    return () => {
      mQuery.removeListener(handleMobileSize);
    };
  }, [isMobile]);

  useEffect(() => {
    if (cart) setQuantity(cart.quantity);
    if (cart) setTotal(cart.total_price);
    dispatch(getItemsThunk());
  }, [dispatch, cart]);

  useEffect(() => {
    let filteredItems = items;

    if (typeFilter && typeFilter !== "All") {
      filteredItems = filteredItems.filter((item) => item.type === typeFilter);
    }
    if (priceFilter && priceFilter !== "All") {
      if (parseInt(priceFilter) === 1) {
        filteredItems = filteredItems.filter((item) => item.price < 25);
      } else if (parseInt(priceFilter) === 2) {
        filteredItems = filteredItems.filter((item) => item.price < 50);
      } else if (parseInt(priceFilter) === 3) {
        filteredItems = filteredItems.filter(
          (item) => item.price > 50 && item.price < 120
        );
      } else if (parseInt(priceFilter) === 4) {
        filteredItems = filteredItems.filter((item) => item.price > 120);
      }
    }
    if (teamFilter && teamFilter !== "All") {
      filteredItems = filteredItems.filter(
        (item) => item.team_id === parseInt(teamFilter)
      );
    }

    setFiltered(filteredItems);
  }, [items, typeFilter, priceFilter, teamFilter]);

  if (!items) return <h1>Loading...</h1>;
  // if (!cart) return <h1>Loading...</h1>

  //   const handleDragStart = (e) => e.preventDefault();

  const addToCart = async (item) => {
    // e.preventDefault();
    // e.stopPropagation();
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
    if (teams && item) {
      const team = teams.find((team) => team.id === item.team_id);
      return team.badge_img;
    }
  };

  const getItemTeam = (item) => {
    if (teams && item) {
      const team = teams.find((team) => team.id === item.team_id);
      return team;
    }
  };

  // // FILTERED ARRAY FOR ALICE CAROUSEL
  const filteredArr = filtered?.map((item, i) =>
    item ? (
      <div
        style={{ width: "240px", overflowY: "none" }}
        key={item.id}
        className="item-card cursor-pointer"
        onClick={() => history.push(`/item/${item.id}`)}
      >

        {( //if item does not belong to user, render one of the add or remove favorite buttons
          user && user.id !== item.user_id ?
          !userFavoritesNames.includes(item.name) ?
          <OpenModalButton
            className="favorite-button cursor-pointer"
            buttonText={(<i className="far fa-heart"></i>)}
            onItemClick={closeMenu}
            modalComponent={<AddFavoriteForm type="Item" name={item.name}  img={item.item_img} teams={getItemTeam(item)} />}
          /> :
          //this needs to be a "delete favorite modal"
          <OpenModalButton
            className="unfavorite-button cursor-pointer"
            buttonText={(<i className="fas fa-heart"></i>)}
            onItemClick={closeMenu}
            modalComponent={<AddFavoriteForm type="Item" name={item.name}  img={item.item_img} teams={getItemTeam(item)} />}
          />
          : <></>
        )}
        <img
          className="card-badge"
          src={getItemBadge(item)}
          alt="item-team-badge"
        />
        <img className="card-img" src={item?.item_img} alt={item.name} />
        <div className="item-card-info">
          <div>
            {item.name.length > 25 ? item.name.slice(0, 25) + "..." : item.name}
          </div>
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
              className="add-to-cart cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSlidePosition(i);
                addToCart(item);
              }}
            >
              Add to cart
            </button>
          ) : (
            <button
              className="remove-from-cart cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSlidePosition(i);
                removeItem(item);
              }}
            >
              Remove from cart
            </button>
          )
        ) : (
          user && (
            <button
              className="remove-from-cart cursor-pointer"
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
    ) : (
      <></>
    )
  );
  //empty fragment in ternary fixed create on home page bug

  // CLEATS ARRAY FOR ALICE CAROUSEL
  const cleatsArr = items
    .filter((item) => item.type === "cleats")
    .map((item, i) => (
      <div
        style={{ width: "240px", overflowY: "none" }}
        key={item.id}
        className="item-card cursor-pointer"
        onClick={() => history.push(`/item/${item.id}`)}
      >
          {( //if item does not belong to user, render one of the add or remove favorite buttons
          user && user.id !== item.user_id ?
          !userFavoritesNames.includes(item.name) ?
          <OpenModalButton
            className="favorite-button cursor-pointer"
            buttonText={(<i className="far fa-heart"></i>)}
            onItemClick={closeMenu}
            modalComponent={<AddFavoriteForm type="Item" name={item.name}  img={item.item_img} teams={getItemTeam(item)} />}
          /> :
          //this needs to be a "delete favorite modal"
          <OpenModalButton
            className="unfavorite-button cursor-pointer"
            buttonText={(<i className="fas fa-heart"></i>)}
            onItemClick={closeMenu}
            modalComponent={<AddFavoriteForm type="Item" name={item.name}  img={item.item_img} teams={getItemTeam(item)} />}
          />
          : <></>
        )}
        <img
          className="card-badge"
          src={getItemBadge(item)}
          alt="item-team-badge"
        />
        <img className="card-img" src={item.item_img} alt={item.name} />
        <div className="item-card-info">
          <div>
            {item.name.length > 25 ? item.name.slice(0, 25) + "..." : item.name}
          </div>
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
              className="add-to-cart cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSlidePosition(i);
                addToCart(item);
              }}
            >
              Add to cart
            </button>
          ) : (
            <button
              className="remove-from-cart cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSlidePosition(i);
                removeItem(item);
              }}
            >
              Remove from cart
            </button>
          )
        ) : (
          user && (
            <button
              className="remove-from-cart cursor-pointer"
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
    .map((item, i) => (
      <div
        style={{ width: "240px" }}
        key={item.id}
        className="item-card cursor-pointer"
        onClick={() => history.push(`/item/${item.id}`)}
      >
          {( //if item does not belong to user, render one of the add or remove favorite buttons
          user && user.id !== item.user_id ?
          !userFavoritesNames.includes(item.name) ?
          <OpenModalButton
            className="favorite-button cursor-pointer"
            buttonText={(<i className="far fa-heart"></i>)}
            onItemClick={closeMenu}
            modalComponent={<AddFavoriteForm type="Item" name={item.name}  img={item.item_img} teams={getItemTeam(item)} />}
          /> :
          //this needs to be a "delete favorite modal"
          <OpenModalButton
            className="unfavorite-button cursor-pointer"
            buttonText={(<i className="fas fa-heart"></i>)}
            onItemClick={closeMenu}
            modalComponent={<AddFavoriteForm type="Item" name={item.name}  img={item.item_img} teams={getItemTeam(item)} />}
          />
          : <></>
        )}
        <img
          className="card-badge"
          src={getItemBadge(item)}
          alt="item-team-badge"
        />
        <img className="card-img" src={item.item_img} alt={item.name} />
        <div className="item-card-info">
          <div>
            {item.name.length > 25 ? item.name.slice(0, 25) + "..." : item.name}
          </div>
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
                className="add-to-cart cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSlidePosition(i);
                  addToCart(item);
                }}
              >
                Add to cart
              </button>
            ) : (
              <button
                className="remove-from-cart cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSlidePosition(i);
                  removeItem(item);
                }}
              >
                Remove from cart
              </button>
            )
          ) : (
            user && (
              <button
                className="remove-from-cart cursor-pointer"
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
    .map((item, i) => (
      <div
        style={{ width: "240px" }}
        key={item.id}
        className="item-card cursor-pointer"
        onClick={() => history.push(`/item/${item.id}`)}
      >
          {( //if item does not belong to user, render one of the add or remove favorite buttons
          user && user.id !== item.user_id ?
          !userFavoritesNames.includes(item.name) ?
          <OpenModalButton
            className="favorite-button cursor-pointer"
            buttonText={(<i className="far fa-heart"></i>)}
            onItemClick={closeMenu}
            modalComponent={<AddFavoriteForm type="Item" name={item.name}  img={item.item_img} teams={getItemTeam(item)} />}
          /> :
          //this needs to be a "delete favorite modal"
          <OpenModalButton
            className="unfavorite-button cursor-pointer"
            buttonText={(<i className="fas fa-heart"></i>)}
            onItemClick={closeMenu}
            modalComponent={<AddFavoriteForm type="Item" name={item.name}  img={item.item_img} teams={getItemTeam(item)} />}
          />
          : <></>
        )}
        <img
          className="card-badge"
          src={getItemBadge(item)}
          alt="item-team-badge"
        />
        <img className="card-img" src={item.item_img} alt={item.name} />
        <div className="item-card-info">
          <div>
            {item.name.length > 25 ? item.name.slice(0, 25) + "..." : item.name}
          </div>
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
                className="add-to-cart cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSlidePosition(i);
                  // e.preventDefault();
                  addToCart(item);
                }}
              >
                Add to cart
              </button>
            ) : (
              <button
                className="remove-from-cart cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSlidePosition(i);
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
    300: { items: 1 },
    760: { items: 2 },
    1120: { items: 3 },
    1500: { items: 4 },
  };

  return (
    <div className="gallery-container">
      <div className="item-gallery">
        {filtered?.length > 0 ? (
          <AliceCarousel
            infinite
            mouseTracking
            preventEventOnTouchMove
            disableDotsControls={isMobile}
            activeIndex={slidePosition}
            responsive={responsive}
            items={filteredArr}
          />
        ) : (
          <div className="no-filter-found">
            Nothing with this combo, adjust the filters!
          </div>
        )}
        <h2 className="type-header">Cleats</h2>
        <div className="cleats-gallery scrollable-x">
          <AliceCarousel
            infinite
            mouseTracking
            preventEventOnTouchMove
            disableDotsControls={isMobile}
            activeIndex={slidePosition}
            responsive={responsive}
            items={cleatsArr}
          />
        </div>
        <h2 className="type-header">Socks</h2>
        <div className="socks-gallery scrollable-x">
          <AliceCarousel
            infinite
            mouseTracking
            preventEventOnTouchMove
            disableDotsControls={isMobile}
            activeIndex={slidePosition}
            responsive={responsive}
            items={socksArr}
          />
        </div>
        <h2 className="type-header">Soccer Balls</h2>
        <div className="ball-gallery scrollable-x">
          <AliceCarousel
            infinite
            mouseTracking
            preventEventOnTouchMove
            disableDotsControls={isMobile}
            activeIndex={slidePosition}
            responsive={responsive}
            items={ballArr}
          />
        </div>
      </div>
    </div>
  );
}
