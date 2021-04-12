import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper';
import Base from '../core/Base';


const Signin = () => {

    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false,
        loading:false,
        didRedirect:false
    });

    const { name, email, password, error, success, loading, didRedirect } = values;

    const handleChange = (name) =>
     (event) => {
         setValues({...values, error:false, [name]:event.target.value})
     };

     const onSumit = (event) => {
       event.preventDefault();
       setValues({...values, error:false, loading:true})

       signin({email, password})
       .then(data => {
         console.log("DATA", data);
         if(data.token) {
          //  let sessionToken = data.token;
           authenticate(data, () => {
             console.log("TOKKEN ADDED");
             setValues({
               ...values,
               didRedirect:true
             })
           });
         } else {
           setValues({
             ...values,
             error: data.error,
             loading:false
           })
         }
       })
       .catch((e) => console.log(e));
     };

     const performRedirect = () => {
       if(isAuthenticated()) {
         return <Redirect to="/"/>
       } 
     }

     const loadingMessage = () => {
       return (
         loading && (
           <div className="container">
           <div className="alert alert-success alert1">
             <h4>Loading...</h4>
           </div>
           </div>
         )
       );
     };


    // const successMessage = () => {
    //     return(
    //       <div className="row">
    //        <div className="col-md-6 offset-sm-3 text-left">
    //          <div className="alert alert-success"
    //            style={{display: success ? "":"none"}}
    //          >
    //            New account created successfully.Please 
    //            <Link to="/signin"> log in.</Link>
    //          </div>
    //        </div>
    //       </div>
    //     )
    //   }
 
      const errorMessage = () => {
       return(
         <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger"
              style={{display: error ? "":"none"}}
            >
              {error}
            </div>
          </div>
         </div>
       )
     }
 
      const signInForm = () => {
          return(
              <div className="row">
               <div className="col-md-6 offset-sm-3 text-left">
                <form>
                   
                    <div className="form-group">
                      <label className="text-dark">Email</label>
                      <input 
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange("email")}
                      type="text"
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-dark">Password</label>
                      <input 
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handleChange("password")}
                      type="password"
                      />
                    </div>
                    <button
                    onClick={onSumit}
                     className="btn btn-success btn-block">Submit</button>
                </form>
               </div>
 
              </div>
          )
      }


    return (
        <Base title="Welcome to Mayo Momo" description="Signin Page">
          
            {/* {loadingMessage()} */}
            {errorMessage()}
            {loadingMessage()}
            {signInForm()}
            <p className="text-center">
              {/* {JSON.stringify(values)} */}
              email : test@gmail.com
              password : 12345
            </p>
            {performRedirect()}
        </Base>
    )
}

export default Signin;