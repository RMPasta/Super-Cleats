import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getItemsThunk } from "../../store/item";
import OpenModalButton from "../OpenModalButton";
import EditItemForm from "../EditItemForm";
import DeleteModal from "../DeleteModal";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./UsersItems.css";
import "./carousel-style.css";

export default function UsersItems() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const items = useSelector((state) => state.item.items);
  const user = useSelector((state) => state.session.user);
  const teams = useSelector((state) => state.team.teams);
  const [isNotMobile, setIsNotMobile] = useState(true);

  // JAVASCRIPT MEDIA QUERY
  useEffect(() => {
    const mQuery = window.matchMedia("(max-width: 600px)");
    function handleMobileSize(e) {
      // Check if the media query is true
      if (e.matches) {
        setIsNotMobile(false);
        return;
      }
      setIsNotMobile(true);
      return;
    }
    // Set up event listener
    mQuery.addListener(handleMobileSize);
    return () => {
      mQuery.removeListener(handleMobileSize);
    };
  }, [isNotMobile]);

  useEffect(() => {
    if (!user) return history.push("/");
    dispatch(getItemsThunk());
  }, [dispatch, history, user]);

  if (!items) return <h1>...Loading</h1>;
  if (!teams) return <></>;
  if (!user) return <></>;

  const usersItems = items.filter((item) => item.user_id === user.id);
  const closeMenu = () => setShowMenu(false);
  const getItemBadge = (item) => {
    const team = teams.find((team) => team.id === item.team_id);
    return team.badge_img;
  };
  const teamId = localStorage.getItem("teamId");
  const favTeam = teams[teamId - 1];
  const userProfileBackground = () => {
    if (favTeam) {
      return {
        backgroundImage: `url(${favTeam.badge_img})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "50%",
      };
    }
  };

  const userItemsArr = usersItems.map((item) => (
    <div
      style={{ height: "480px", width: "240px" }}
      key={item.id}
      className="item-card item-card-user"
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
        <OpenModalButton
          className="edit-button cursor-pointer"
          buttonText="Edit"
          onItemClick={closeMenu}
          modalComponent={<EditItemForm item={item} showMenu={showMenu} />}
        />
        <OpenModalButton
          className="delete-button cursor-pointer"
          buttonText="Delete"
          onItemClick={closeMenu}
          modalComponent={<DeleteModal item={item} showMenu={showMenu} />}
        />
      </div>
    </div>
  ));

  const responsive = {
    400: { items: 1 },
    700: { items: 2 },
    900: { items: 3 },
    1400: { items: 4 },
  };

  return (
    <div className="gallery-container-user" style={userProfileBackground()}>
      <h2 className="type-header"></h2>
      <div
        className="alice-container"
        style={{
          width: "90%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AliceCarousel
          autoPlayInterval={2200}
          autoPlay={isNotMobile}
          infinite
          mouseTracking
          preventEventOnTouchMove
          responsive={responsive}
          items={userItemsArr}
        />
      </div>
    </div>
  );
}
