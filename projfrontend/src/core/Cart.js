import React, {useState, useEffect} from 'react';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import PaymentB from './PaymentB';


const Cart = () => {

    const [reload, setReload] = useState(false)

   const [products, setProducts] = useState([])

   useEffect(() => {
      setProducts(loadCart())
   },[reload])

   const loadAllProducts = (products) => {
       return(
        <div>
        <h2>My Bag</h2>
        <div className="row">
               {products.map((product,index) => {
                   return(
                    <div key={index} className="col-md-4 mb-4">
                   <Card 
                       key={index}
                       product={product}
                       removeFromCart={true}
                       addtoCart={false}
                       reload={reload}
                       setReload={setReload}
                   />
                   </div>)
               })}
               </div>
           </div>
       )
   }

   

    return (
        <Base title="Cart page" description="Welcome to checkout">
      <div className="row text-center">
        <div className="col-md-7">
          {products.length > 0 ? (loadAllProducts(products)) : (
            <h4>No products</h4>
          )}
        </div>
        <div className="col-md-5">
          {products.length > 0
            ? (
              <PaymentB products={products} setReload={setReload} />
            )
            : (
              <h3>Please login or add something in cart</h3>
            )}
        </div>
      </div>
    </Base>
    )
}

export default Cart;