import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import {Logo} from '../components'
import { Link, Navigate } from 'react-router-dom'
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const { user } = useAppContext();
  return (
    <>
    {/* we check if the user exist if it does we directly go to the dashboard */}
    {user && <Navigate to='/'/>}
    <Wrapper>
      <nav>
        <Logo/>
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
              narwhal.
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
            {/* <button className="btn btn-hero">Login/Register</button> */}
          </div>
          <img src={main} alt="job hunt" className="img main-img" />
        </div>
    </Wrapper>
    </>
  );
};



export default Landing;
