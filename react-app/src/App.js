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

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teamPicked, setTeamPicked] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation setTeamPicked={setTeamPicked} isLoaded={isLoaded} />
      {user && <Teams />}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {}
            {user || teamPicked ? (
              <>
                <ItemsPageHeader />
                <div className="filter-items-container">
                  <div className="filter-app">
                    <Filter />
                  </div>
                  <div className="items-app">
                    <Items />
                  </div>
                </div>
              </>
            ) : (
              <Landing setTeamPicked={setTeamPicked} />
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
