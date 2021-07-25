import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout.js";
import Payment from "./Payment.js";
import Login from "./Login.js";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase.js";
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Orders from './Orders.js'
import PaymentSuccess from './PaymentSuccess.js'

const promise=loadStripe("pk_test_51IhJiXCK9quIU5FSD2l4pDvUzONXPGw5n3PSEy89eLewltwU9GlFNNOU5IaTF6rMBUnf1b7Jc0lmsljsMjkG8JmS00TDCGkae9")
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/paymentSuccess">
            <PaymentSuccess/>
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
            <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
