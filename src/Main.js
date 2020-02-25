import React, {useState, useEffect, useContext} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";// to link pages (Home, about, contacts...)
import "./App.css";
import About from "./About"
import Contact from "./Contact"
import NavBar from "./NavBar"
import Footer from "./Footer"
// Moving all global states from App.js to Main.js
import logo from './logo.svg';
 // Now styling will apply to all compnents/pages
import App from "./App"
import AppContext from "./AppContext";
import Sidebar from "./Sidebar"
import Overlay from "./Overlay"


// Array of links on NavBar
const links = [
    {
        "label" : "Home",
        "path" : "/"
    },
    {
        "label" : "About",
        "path" : "/about"
    },
    {
        "label" : "Contact",
        "path" : "/contact"
    },
    {
        "label" : "Settings",
        "path" : "/settings"
    }
]


const LayoutRoute = ({path, exact, component}) => {
    return(
        <div>
        <NavBar links={links} logo={logo}/>
        <Route path={path} exact={exact} component={component}/>
        <Sidebar />
        <Overlay />
        <Footer links={links}/>
        </div>
    )
}

const PrivateRoute = ({component: Component, ...restOfProps}) => {
    
    const [globalState] = useContext(AppContext)
    
    return (
        <Route {...restOfProps} render=
        {(props)=>globalState.loggedIn === "true" ? 
            <LayoutRoute component= {()=><Component {...props}/>} />: 
            <Redirect to={"/"} />
        } /> 
    )
}

const ErrorPage =() => {
    return(
        <div className="page">
            <h1>404 Page not found.</h1>
        </div>
    )
}

const Main = () => {
    const [globalState, setGlobalState] = useState( // we store 2 things in web browser: jwt web token, and userid from mongoddb
        {// we need the userid, b/c if user is logged in, we must fetch their feed
        userid: sessionStorage.getItem("userid") ? sessionStorage.getItem("userid") : null,
        loggedIn: sessionStorage.getItem("jwt") ? "true" : "false", //inline condition
        sidebarOpen: false,
        postsLoaded: false
        }
    )
    return (
        <AppContext.Provider value={[globalState, setGlobalState]}>
            <BrowserRouter>
            <Switch>
                <LayoutRoute path="/" exact={true} /* tells BrowserRouter to differentiate / from /About*/ component={App}/>
                <LayoutRoute path="/about" component={About}/>
                <PrivateRoute path="/contact" component={Contact} />
                <LayoutRoute path="/*" component={ErrorPage}/>
            </Switch> 
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default Main;