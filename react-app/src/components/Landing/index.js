import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamsThunk } from "../../store/team";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Landing.css";

export default function Landing({ teamPicked, setTeamPicked }) {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.team.teams);
  const [isMobile, setIsMobile] = useState(false);

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
    dispatch(getTeamsThunk());
  }, [dispatch]);

  if (!teams) return <h1>Loading...</h1>;

  const teamsArr = teams.map((team) => (
    <div key={team.id} className="splash-team-card">
      <img
        onClick={() => {
          setTeamPicked(team.id);
        }}
        className="splash-badge cursor-pointer"
        src={team.badge_img}
        alt={team.name}
      />
      {/* <div>{team.name}</div> */}
    </div>
  ));
  const responsive = {
    400: { items: 3 },
    1150: { items: 4 },
  };

  return (
    <div className="landing-page">
      {/* <img
        className="landing-image"
        src="https://supercleats-pics.s3.amazonaws.com/splash1.jpg"
        alt="landing image"
      /> */}
      <div className="splash-text">Pick your favorite team or log in to enter</div>
      <div className="splash-teams">
        <AliceCarousel
          autoPlayInterval={800}
          autoPlay
          infinite
          mouseTracking
          disableDotsControls={isMobile}
          responsive={responsive}
          items={teamsArr}
        />
      </div>
    </div>
  );
}
