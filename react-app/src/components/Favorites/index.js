import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTicketsThunk } from "../../store/ticket";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getFavoritesThunk } from "../../store/favorite";
import "./Favorites.css";

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const favorites = useSelector((state) => state.favorite.favorites);

  useEffect(() => {
    dispatch(getFavoritesThunk());
  }, [dispatch]);

  const favoritesArr = favorites?.map((favorite, i) => (
    <div className="favorite-card">
      <div className="favorite-name">{favorite.name}</div>
      <div className="story scrollable-y">Story: {favorite.story}</div>
    </div>
  ));

  const responsive = {
    400: { items: 1 },
    800: { items: 2 },
    1200: { items: 3 },
    // 1640: { items: 3 },
  };

  return (
    <div className="items-header-container">
        <h2 className="favorites-header">THE PEOPLE HAVE SPOKEN</h2>
        <AliceCarousel
          autoPlayInterval={2800}
          autoPlay
          infinite
          mouseTracking
          preventEventOnTouchMove
          disableButtonsControls
          disableDotsControls
          // activeIndex={slidePosition2}
          responsive={responsive}
          items={favoritesArr}
        />
    </div>
  );
}
