import React, {useState, useEffect} from 'react'
import {getProducts} from "./helper/coreapicalls"
import Footer from "./footer"
import "../styles.css"
import Card from "./Card"
import { loadCart } from './helper/CartHelper';
import { Link } from "react-router-dom";
// import logo from './momo.jpg'; // with import

import Menu from './Menu';
import Description from './description'

export default function Home() {
    
  

    const [products, SetProducts] = useState([])
    const[error, setError] = useState(false)

    const [productsInCart, setProductsInCart] = useState([]);
    const [reload, setReload] = useState(false);
    
    const loadAllProducts = () => {
        getProducts()
        .then((data) => {
            if(data.error){
                setError(data.error)
                console.log(error)
            }
            else{
                SetProducts(data);
            }
        });
    };
    
    useEffect(() => {
        loadAllProducts();
        setProductsInCart(loadCart());
    },[reload]);

    const getFinalPrice = () => {
        let amount = 0;
        productsInCart.map((p) => {
          amount += parseInt(p.price);
        });
        return amount;
      };
    
    return (
        // <Base title="MAYO MOMO" description="Welcome to Mayo Momo">
        <div>
            <div className="bcg">
                
        {/* <div className="container-fluid">
        <img src={logo} style={{height:600, width:1200}} />
        </div> */}
            {/* <h1>MENU</h1> */}
            <div className="top">
               
                <div className="title-text">
                    MAYO MOMO
                    <p>Yummy &amp; Tasty</p>
                    
                </div>
                
                <Menu/>
            <div class="custom-shape-divider-bottom-1610464598">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
    </svg>
</div>

            </div>
            <br/>
            <div className="container">
            <div className="row">
            <div className="col-md-2">
              </div>
            <div className="col-md-8">
            <div className="text-white">
        <div className="card text-white abc border border-info my-3 mx-3">
          <div className="card-header">
              <div className="row">
              <div className="col-md-6">
                <div className="row">
                Total Items- {productsInCart.length}
                </div>
                <div className="row">
                Order Total - &#x20b9;{getFinalPrice()}
                </div>
                </div>
            
              <div className="col-md-6"><button
              className="btn btn-block btn-warning mt-2 mb-2"
            >
              <Link to="/cart" className="nav-link text-dark">
                Go to Cart
              </Link>
            </button></div>
            </div>
              </div>
        </div>
      </div></div>
      <div className="col-md-2">
              </div>
              </div>
              </div>

            <div className="container-fluid">
            <div className="row">
               
            {/* {productsInCart.length} */}
            {products.map((product, index) => {
                return(
                    <div key={index} className="col-md-4">
                       <Card product={product}
                       setReload={setReload}
                       reload={reload}/>
                    </div>
                );

            })}
           <div className="col-md-3">
           
         
           </div>
            </div>
            </div>
            </div>
        <Description/>
            <Footer/>
            {/* <footer className="footer bg-outline-info text-warning mt-5 p-4 text-center bg-dark">
        <a
          className="text-warning p-2"
          href="https://www.linkedin.com/in/sharmistha-mandal-636744194/"
          target="_blank"
        >
          <i className="fa fa-linkedin-square" /> Made by Sharmistha{" "}
        </a>
        &copy; {new Date().getFullYear()}
      </footer> */}
            </div>
        // </Base>
    );
}
