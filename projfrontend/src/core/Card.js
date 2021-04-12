import React,{useState} from 'react'
import ImageHelper from './helper/ImageHelper';
import {Redirect} from "react-router-dom";
import {isAuthenticated} from '../auth/helper'


import "../styles.css"
import { addItemToCart,removeItemFromCart } from './helper/CartHelper';

// const isAuthenticated = true;

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = f => f
    // function(f){return f}

}) => {
  const [redirect, setRedirect] = useState(false)
  const [direct, setDirect] = useState(false)
  
  
  
    const cartTitle = product ? product.name : "momos"
    const cartDescription = product ? product.description : "Deafult description"
    const cartPrice = product ? product.price : "something went wrong"
    // const cartCategory = product ? product.category : "something went wrong"

    
    const addToCart = () => {
        if (isAuthenticated()){
          addItemToCart(product,()=>setRedirect(true));
            console.log("Added to cart")
        }
        else{
          addItemToCart(product,()=>setDirect(true));
            console.log("Login Please!!!!")
            
        }
    }

    const getAredirect = redirect => {
        if (redirect){
            return <Redirect to="/" />
        }
    }; 

    const getAdirect = direct => {
      if (direct){
          return <Redirect to="/signin" />
      }
  }; 

    const showAddToCart = addToCart => {
        return(
            addtoCart && (
              <div className="row text-center">
                <button
                onClick={() => {
                  addToCart();
                  setReload(!reload);
                }}
                className="btn btn-block btn-outline-success mt-2 mb-2 buto"
              >
                <i class="fa fa-shopping-cart ico"></i>
                Add to Cart
              </button>
              </div>
            )
        )
    }
    // const showRemoveFromCart = (removeFromCart) => {
    //   return (
    //     removeFromCart && (
    //       <button
    //         onClick={() => {
    //           removeItemFromCart(product._id);
    //           setReload(!reload);
    //         }}
    //         className="btn btn-block btn-outline-danger mt-2 mb-2"
    //       >
    //         Remove from cart
    //       </button>
    //     )
    //   );
    // };
    const showRemoveFromCart = removeFromCart => {
        return(
            removeFromCart && (
                <button
                onClick={() => {
                    removeItemFromCart(product._id)
                    setReload(!reload)
                    console.log("Product removed from cart")
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove
              </button>
            )
        )
    }
    return (
      <div className="card text-white bg-dark border border-info">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
        {getAredirect(redirect)}
        {getAdirect(direct)}
         <ImageHelper product={product}/>
          <p className="lead bg-default font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-info rounded  btn-sm px-4">&#x20b9; {cartPrice}</p>

            {showAddToCart(addToCart)}
            
            {showRemoveFromCart(removeFromCart)}
            
        
        </div>
      </div>
    );
  };
export default Card;