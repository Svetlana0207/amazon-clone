import React from 'react'
import './PaymentSuccess.css'
import {useHistory } from "react-router-dom";

function PaymentSuccess() {

    const history=useHistory()

    const backToOrders=(e)=>{
         e.preventDefault()
         history.replace('/orders')
    }
    return (
        <div className="payment__success">
            <h3>Your payment is successful!</h3>
            <button onClick={backToOrders}>Back To Orders</button>
        </div>
    )
}

export default PaymentSuccess
