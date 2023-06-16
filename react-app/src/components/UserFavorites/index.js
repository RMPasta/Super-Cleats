import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getFavoritesThunk } from "../../store/favorite";
import OpenModalButton from "../OpenModalButton";
import DeleteFavoriteModal from "../DeleteFavoriteModal";
// import EditFavoritesForm from "../EditFavoritesForm";
import DeleteModal from "../DeleteModal";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./UserFavorites.css";
// import "./carousel-style.css";

export default function UsersFavorites() {
  const dispatch = useDispatch();
  const history = useHistory();
  const favorites = useSelector((state) => state.favorite.favorites);
  const user = useSelector((state) => state.session.user);
  const teams = useSelector((state) => state.team.teams);
  const [isNotMobile, setIsNotMobile] = useState(true);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);
  const [slidePosition, setSlidePosition] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);


  const usersFavorites = favorites?.filter((favorite) => favorite.user_id === user?.id);

  useEffect(() => {
    if (!user) return history.push("/");
    dispatch(getFavoritesThunk());
  }, [dispatch, history, user]);

  useEffect(() => {
    if (usersFavorites?.length < 4) {
      setShouldAutoPlay(false)
    }
  }, [usersFavorites]);

  if (!favorites) return <h1>...Loading</h1>;
  if (!teams) return <></>;
  if (!user) return <></>;

//   const closeMenu = () => setShowMenu(false);
//   const getItemBadge = (item) => {
//     const team = teams.find((team) => team.id === item.team_id);
//     return team.badge_img;
//   };
//   const teamId = localStorage.getItem("teamId");
//   const favTeam = teams[teamId - 1];
//   const userProfileBackground = () => {
//     if (favTeam) {
//       return {
//         backgroundImage: `url(${favTeam.badge_img})`,
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center bottom",
//         backgroundSize: "45%",
//       };
//     }
//   };

  const responsive = {
    300: { items: 1 },
    900: { items: 2 },
    1300: { items: 3 },
    1500: { items: 4 },
  };

  const usersFavoritesArr = usersFavorites.map(favorite => (
    <div className="favorite-card">
      {console.log(favorite)}
        <OpenModalButton
          className="unfavorite-button cursor-pointer"
          buttonText={(<i className="fas fa-heart test-heart"></i>)}
          onTicketClick={closeMenu}
          modalComponent={<DeleteFavoriteModal favorite={favorite} setSlidePosition={setSlidePosition} index={0} />}
        />
        <div className="favorite-name">{favorite.name}</div>
        <div className="story scrollable-y">Story: {favorite.story}</div>
    </div>
  ))

  return (
    <div>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AliceCarousel
          autoPlayInterval={3200}
          autoPlay={isNotMobile && shouldAutoPlay}
          infinite
          mouseTracking
          preventEventOnTouchMove
          activeIndex={slidePosition}
          responsive={responsive}
          items={usersFavoritesArr}
        />
      </div>
    </div>
  );
}
