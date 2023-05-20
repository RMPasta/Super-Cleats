import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeamsThunk } from "../../store/team";
import "./Landing.css";

export default function Landing({ setTeamPicked }) {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.team.teams);

  useEffect(() => {
    dispatch(getTeamsThunk());
  }, [dispatch]);

  if (!teams) return <h1>Loading...</h1>;
  return (
    <div className="landing-page">
      {/* <img
        className="landing-image"
        src="https://supercleats-pics.s3.amazonaws.com/splash1.jpg"
        alt="landing image"
      /> */}
      <div className="splash-text">Pick your favorite team</div>
      <div className="splash-teams">
        {teams.map((team) => (
          <div key={team.id} className="splash-team-card">
            <img
              onClick={() => setTeamPicked(team.id)}
              className="splash-badge cursor-pointer"
              src={team.badge_img}
              alt={team.name}
            />
            {/* <div>{team.name}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
