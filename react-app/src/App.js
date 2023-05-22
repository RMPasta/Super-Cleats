import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Items from "./components/Items";
import Teams from "./components/Teams";
import UsersItems from "./components/UsersItems.js";
import ItemDetails from "./components/ItemDetails";
import ItemsPageHeader from "./components/ItemsPageHeader";
import Filter from "./components/Filter";
import "./App.css";
import Landing from "./components/Landing";
import { getTeamsThunk } from "./store/team";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamPicked, setTeamPicked] = useState(false);
  const [typeFilter, setTypeFilter] = useState("")
  const [priceFilter, setPriceFilter] = useState("")
  const [teamFilter, setTeamFilter] = useState("")
  const teamId = localStorage.getItem("teamId");

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    dispatch(getTeamsThunk());
    if (teamId) setTeamPicked(teamId);
  }, [dispatch, teamId]);

  return (
    <>
      <Navigation
        teamPicked={teamPicked}
        setTeamPicked={setTeamPicked}
        isLoaded={isLoaded}
      />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {}
            {user || teamPicked ? (
              <>
                <Teams />
                <ItemsPageHeader />
                <div className="filter-items-container">
                  <div className="filter-app">
                    <Filter
                    setTypeFilter={setTypeFilter}
                    setPriceFilter={setPriceFilter}
                    setTeamFilter={setTeamFilter}
                    typeFilter={typeFilter}
                    priceFilter={priceFilter}
                    teamFilter={teamFilter} />
                  </div>
                  <div className="items-app">
                    <Items typeFilter={typeFilter} priceFilter={priceFilter} teamFilter={teamFilter} />
                  </div>
                </div>
              </>
            ) : (
              <Landing setTeamPicked={setTeamPicked} teamPicked={teamPicked} />
            )}
          </Route>
          <Route path="/item/:id">
            <ItemDetails />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/user">
            <UsersItems />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
