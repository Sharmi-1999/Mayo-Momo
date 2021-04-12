import React from 'react';
import '../description.css';
import h from './h.jpg';
import bm from './bm.jpg';
import fm from './fm.jpg';
import csm from './csm.jpg';
import "../styles.css"




const Description = ({
    title = "My Title",
    description = "My description",
    className = "bg-dark text-white p-4"
}) => {
    return (
        <div className="desbottom">
            <br/>
          <div class="custom-shape-divider-top-1613810957">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M1200 0L0 0 598.97 114.72 1200 0z" class="shape-fill"></path>
    </svg>
</div>
{/* <br/> */}
<footer className="footer mt-4 pt-3">
                  <div className="container text-center pt-5 mt-5">
                    <h1 className="heading"><u>OUR SPECIALITY</u></h1>
                    <br/>
                    
                    <div className="row pb-2">
                        <div className="col-md-6 pb-2">
                           <div className="card zoom">
                                <div className="card-body">
                                  <h5 className="card-title">Best Quality</h5>
                                  <p className="card-text">We provide the best quality momos of several varieties like Steam momo,Fried momo,etc.</p>
                                  {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                  <img src={bm} alt="Best Quality"/>
                                </div>
                              
                            </div>
                            </div>
                            <div className="col-md-6 pb-2">
                            <div className="card zoom">
                                <div className="card-body">
                                  <h5 className="card-title">Hyginic</h5>
                                  <p className="card-text">We care about the cleanliness and maintain the hygiene.So, people can eat the food without any hesitation.</p>
                                  <img src={h} alt="Hyginic"/>

                                  {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                                </div>
                              </div></div>
                            </div>
                            
                            <div className="row">
                        <div className="col-md-6 pb-2">
                           <div className="card zoom">
                                <div className="card-body">
                                  <h5 className="card-title">Stuffing</h5>
                                  <p className="card-text">Freshness is the priority.</p>
                                  <img src={fm} alt="stuffing"/>
                                  
                                </div>
                              
                            </div>
                            </div>
                            <div className="col-md-6 pb-2">
                            <div className="card zoom">
                                <div className="card-body">
                                  <h5 className="card-title">Best Customer Service</h5>
                                  <p className="card-text">We work hard to give the best service to you.</p>
                                  <img src={csm} alt="customer service"/>
                                  
                                </div>
                              </div></div>
                            </div>
                            

                        </div>
                        {/* <div className="col-md-6">
                        <img src={logo} alt="My logo" />
                        </div> */}
                       
                    

              </footer> 
              <br/>
              <br/>

            
            
</div>
    )
}


export default Description;