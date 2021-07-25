import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal.js'
import CheckoutProduct from './CheckoutProduct.js'
import { useStateValue } from "./StateProvider";


function Checkout() {
    const [{basket,user}, dispatch] = useStateValue()
    console.log(user)
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt=""/>
                <h3>Hello,{user?.email}</h3>
                <div className="checkout__title">
                <h2>Your shopping basket</h2>
                {basket.map(item => (
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
           <div className="checkout__right">
            <h2>This subtotal will go here</h2>
            <Subtotal/>
           </div>
        </div>
    )
}

export default Checkout
