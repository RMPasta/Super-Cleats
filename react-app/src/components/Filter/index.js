import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Filter.css";

export default function Filter({ typeFilter, setTypeFilter, priceFilter, setPriceFilter, teamFilter, setTeamFilter}) {
  const teams = useSelector((state) => state.team.teams);
  const [priceText, setPriceText] = useState("All");
  const [typeText, setTypeText] = useState("All");

  useEffect(() => {
    if (priceFilter === "All") {
      setPriceText("All")
    } else if (priceFilter === "1") {
      setPriceText("Low")
    } else if (priceFilter === "2") {
      setPriceText("Mid-Low")
    } else if (priceFilter === "3") {
      setPriceText("Mid-High")
    } else if (priceFilter === "4") {
      setPriceText("High")
    }
  }, [setPriceText, priceFilter])

  useEffect(() => {
    if (typeFilter === "All") {
      setTypeText("All")
    } else if (typeFilter === "cleats") {
      setTypeText("Cleats")
    } else if (typeFilter === "socks") {
      setTypeText("Socks")
    } else if (typeFilter === "ball") {
      setTypeText("Soccer Balls")
    }
  }, [setTypeText, typeText, typeFilter])

  if (!teams) return <h1>Loading...</h1>;


  return (
    <div className="filter-layout">
      <div className="filter-container">
        <div className="filter-top-section">
          <h2>Filtered by:</h2>
          <h3 className="type-tag">Type: {typeText}</h3>
          <h3 className="price-tag">Price: {priceText}</h3>
          <h3 className="team-tag">Team: {teams[parseInt(teamFilter) - 1]?.name || "All"}</h3>
          <ul className="type-filter cursor-pointer">
            <li onClick={() => setTypeFilter("All")}>All</li>
            <li onClick={() => setTypeFilter("cleats")}>Cleats</li>
            <li onClick={() => setTypeFilter("socks")}>Socks</li>
            <li onClick={() => setTypeFilter("ball")}>Soccer Balls</li>
          </ul>
        </div>
        <div className="filter-middle cursor-pointer">
          <div onClick={() => setPriceFilter("All")}>All</div>
          <div onClick={() => setPriceFilter("1")}>$</div>
          <div onClick={() => setPriceFilter("2")}>$$</div>
          <div onClick={() => setPriceFilter("3")}>$$$</div>
          <div onClick={() => setPriceFilter("4")}>$$$$</div>
        </div>
        <div className="filter-bottom">
          <label>Filter by team
          <select
              placeholder="Team associated with item..."
              onChange={(e) => setTeamFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="1">Fulham</option>
              <option value="2">Brentford</option>
              <option value="3">Brighton</option>
              <option value="4">Manchester City</option>
              <option value="5">Manchester United</option>
              <option value="6">Wolverhampton</option>
              <option value="7">Liverpool</option>
              <option value="8">Crystal Palace</option>
              <option value="9">Chelsea</option>
              <option value="10">Newcastle United</option>
              <option value="11">Leicester</option>
              <option value="12">Everton</option>
              <option value="13">Arsenal</option>
              <option value="14">Aston Villa</option>
              <option value="15">Leeds United</option>
              <option value="16">West Ham</option>
              <option value="17">Tottenham Hotspur</option>
              <option value="18">Bournemouth</option>
            </select>
          </label>
          <div className="filter-teams scrollable-x"></div>
        </div>
      </div>
    </div>
  );
}
