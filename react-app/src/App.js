import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Items from "./components/Items";
import Teams from "./components/Teams";
import Cart from "./components/Cart";
import AddItemForm from "./components/AddItemForm";
import UsersItems from "./components/UsersItems.js";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Teams />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Cart />
            <Items />
          </Route>
          <Route path="/login" >
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
