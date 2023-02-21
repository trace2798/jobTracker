import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import Wrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
  /* Destructuring the toggleSidebar function from the useAppContext hook. */
  const { user, logoutUser, toggleSidebar } = useAppContext();
  const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <button type="button" className="btn" onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {/* this is called optional chaining */}
            {user?.name}
            <FaCaretDown />
          </button> 
          {/* <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn">
              Logout
            </button>
          </div> */}
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}> 
             <button onClick={logoutUser} className="dropdown-btn">
              logout
            </button> 
           </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
