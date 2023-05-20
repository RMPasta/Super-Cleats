import React from "react";
import { useSelector } from "react-redux";
import "./Filter.css";

export default function Filter() {
  const teams = useSelector((state) => state.team.teams);

  if (!teams) return <h1>Loading...</h1>;

  return (
    <div className="filter-layout">
      <div className="filter-container">
        <div className="filter top section">
          <h2>Filter Products:</h2>
          <ul className="type-filter">
            <li>Cleats</li>
            <li>Socks</li>
            <li>Soccer Balls</li>
          </ul>
        </div>
        <div className="filter-middle">
          <div>$</div>
          <div>$$</div>
          <div>$$$</div>
          <div>$$$$</div>
        </div>
        <div className="filter-bottom">
          <div>Filter by team</div>
          <div className="filter-teams scrollable-x">
            {teams.map((team) => (
              <div key={team.id} className="team-card">
                <img
                  className="team-img"
                  src={team.badge_img}
                  alt={team.name}
                />
                {/* <div>{team.name}</div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
