import React,{Fragment, useReducer} from 'react';
import {Link, withRouter} from "react-router-dom";
import { isAuthenticated, signout } from '../auth/helper';
// import {loadAllProducts} from './Cart';

import logo from "./logo1.png"

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color:"#2ecc72"}
    }else{
        return {color:"#ff0066"}
    }
};

const Menu = ({history, path}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
            <Link style={currentTab(history,"/")} className="nav-link" to="/"><img src={logo} alt="My logo" /></Link>
            {isAuthenticated() && (
                    <Fragment>
                        <h2 className="pq">Welcome {isAuthenticated().user.name}</h2>
                    </Fragment>  

                )}
  {/* <a className="navbar-brand" href="#">Navbar</a> */}
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse navv" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto mr-5">
    <li className="nav-item navv-item">
            <Link style={currentTab(history,"/")} className="nav-link" to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
            <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
            </li> */}
            
            {!isAuthenticated() && (
                <Fragment><li className="nav-item">
            <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">SignUp</Link>
            </li>
            <li className="nav-item">
            <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">SignIn</Link>
            </li>
            </Fragment>   
            )}
            {isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
            <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
            </li>
            
                <li className="nav-item">
            <span 
            onClick={() => {
                signout(()=>{
                    history.push("/")
                })
            }}
            className="nav-link text-warning">SignOut</span>
            </li>
            </Fragment>
            )}
            
    </ul>
  </div>
</nav>



            {/* <ul className="nav nav-tabs">
            <li className="nav-item">
            <Link style={currentTab(history,"/")} className="nav-link" to="/">HOME</Link>
            </li>
            <li className="nav-item">
            <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">Cart</Link>
            </li>
            
            {!isAuthenticated() && (
                <Fragment><li className="nav-item">
            <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">SignUp</Link>
            </li>
            <li className="nav-item">
            <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">SignIn</Link>
            </li>
            </Fragment>   
            )}
            {isAuthenticated() && (
                <li className="nav-item">
            <span 
            onClick={() => {
                signout(()=>{
                    history.push("/")
                })
            }}
            className="nav-link text-warning">SignOut</span>
            </li>
            )}
            </ul> */}
        </div>
    );
};

export default withRouter(Menu);