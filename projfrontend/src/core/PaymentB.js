import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { cartEmpty } from "./helper/CartHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated, signout } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({
  products,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token)
      .then((info) => {
        if (info.error) {
          setInfo({
            ...info,
            error: info.error,
          });
          signout(() => {
            return <Redirect to="/" />;
          });
        } else {
          const clientToken = info.clientToken;
          setInfo({ clientToken });
        }
      });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };
  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      console.log("MYDATA", data);
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log("POINT-1", response);
          if (response.error) {
            if (response.code === "1") {
              console.log("PAYMENT Failed!");
              signout(() => {
                return <Redirect to="/" />;
              });
            }
          } else {
            setInfo({ ...info, success: response.success, loading: false });
            console.log("PAYMENT SUCCESS");

            let product_names = "";
            products.forEach(function (item) {
              product_names += item.name + ", ";
            });

            const orderData = {
              products: product_names,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData)
              .then((response) => {
                if (response.error) {
                  if (response.code === "1") {
                    console.log("Order Failed!");
                    signout(() => {
                      return <Redirect to="/" />;
                    });
                  }
                } else {
                  if (response.success === true) {
                    console.log("ORDER PLACED!!");
                  }
                }
              })
              .catch((error) => {
                setInfo({ loading: false, success: false });
                console.log("Order FAILED", error);
              });
            cartEmpty(() => {
              console.log("Did we got a crash?");
            });

            setReload(!reload);
          }
        })
        .catch((error) => {
            setInfo({ loading: false, success: false });
            console.log("PAYMENT FAILED", error);
        });
    });
  };

  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0
          ? (
            <div>
              <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
              >
              </DropIn>
              <button
                onClick={onPurchase}
                className="btn btn-block btn-success"
              >
                Buy Now
              </button>
            </div>
          )
          : (
            <h3>Please login first or add something in cart</h3>
          )}
      </div>
    );
  };

  return (
    <div>
     <div className="text-white">
        <div className="card text-white bg-dark border border-info my-3 mx-3">
          <div className="card-header">Total</div>
          <div className="card-body text-dark bg-warning">
            <div className="row">
              <div className="col-6">Total Items({products.length})</div>
              {/* <div className="col-6">{products.length}</div> */}
              <div className="col-6">&#x20b9;{getAmount()}</div>
            </div>
            <div className="row">
              <div className="col-6">Discount</div>
              <div className="col-6">
                -&#x20b9;<span id="total_discount">0</span>
              </div>
            </div>
            <hr className="border border-white" />
            <div className="row">
              <div className="col-6">Order Total</div>
              <div className="col-6">&#x20b9; {getAmount()}</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="card border-success mb-3">
  <div className="card-header bg-transparent border-success">Header</div>
  <div className="card-body text-success">
    <h5 className="card-title">Success card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <div className="card-footer bg-transparent border-success">Footer</div>
</div> */}
      {/* <h3>Your bill is &#x20b9; {getAmount()}</h3>
      <h3>{products.length}</h3> */}
      {showbtnDropIn()}
      Card number : 4242 4242 4242 4242 , 
      Expiration Date : 03/23
    </div>
  );
};

export default PaymentB;
