import React, { useState,useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "./reducer";
import axios from './axios'
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history=useHistory()
  
  const[succeeded,setSucceeded]=useState('')
  const[proccessing,setProccessing]=useState('')
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const[clientSecret, setClientSecret]=useState(true)

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    
    const getClientSecret=async()=>{
           const response=await axios({
               method:'post',
               url:`/payments/create?total=${getBasketTotal(basket)*100}`
           });
           setClientSecret(response.data.clientSecret)
    }

    getClientSecret()
    
  }, [basket])

  console.log('The secret', clientSecret)

  const handleSubmit = async(e) => {
    e.preventDefault()
    setProccessing(true)
    const payload=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent})=>{
      console.log('paymentIntent',paymentIntent)

   db.collection('users')
   .doc(user?.uid)
   .collection('orders')
   .doc(paymentIntent.id)
   .set({
     basket:basket,
     amount:paymentIntent.amount,
     created:paymentIntent.created,
   })

    setSucceeded(true)
    setError(null)
    setProccessing(false)

    dispatch({
        type:'EMPTY_BASKET',

    })

    history.replace('/paymentSuccess')});
  }

  const handleChange = (e) => {
    console.log(e);
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* Payment section-delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/* Payment section-reviewing the items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment method */}
        <div className="payment__section">
          <div className="payment__method">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                   <h3>Order total {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)} 
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={proccessing||disabled||succeeded}>
                  <span>{proccessing?<p>Processing</p>:"Buy Now"}</span>
                </button>
                {error&&<div>{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
