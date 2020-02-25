import React, {useContext} from "react";
import LoginButton from "./LoginButton";
import {Link} from "react-router-dom"; //Allows you to link pages (home, about, contact...)
import AppContext from "./AppContext"
//we need to pass the prop component to navbar and reference it

const NavBar = (prop) => {

    const [globalState, setGlobalState] = useContext(AppContext)

    const openSidebar = () => {
      setGlobalState({...globalState, sidebarOpen: true})
    }

    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand">
           <img src={prop.logo} width="64" height="64" />
        </a>
        <ul className="nav">
          {
            prop.links.map(
              (link) => <li className="nav-item">
              <Link className="nav-link" to={link.path}>{link.label}</Link>
            </li>
            )
          }
      </ul>

        <div className="form-inline">
          <LoginButton />
          <button onClick={openSidebar} className="btn btn-primary">Sidebar</button>
          <input className="form-control mr-sm-2"
                 type="search" 
                 placeholder="Search" 
                 aria-label="Search"/>
          <button 
              className="btn btn-outline-success my-2 my-sm-0" 
              type="submit">Search
          </button>
        </div>
  </nav>
    )
  }

export default NavBar;