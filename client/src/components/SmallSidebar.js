import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
// import links from "../utils/links";
// import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          {/* we need to pass in toggleSidebar because the component is looking for it and without it the functionality will not work. */}
          <NavLinks toggleSidebar={toggleSidebar}/>
          {/* <div className="nav-links">
            {links.map((link) => {
              const { text, path, id, icon } = link;

              return (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  key={id}
                  onClick={toggleSidebar}
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
