import React, {useState, useContext} from "react";
import AppContext from "./AppContext" // useContext and App context go together when using global state

const LoginButton = () => {
    const [state, setState] = useState (
        {
            status: "logged-in",
            label: "Log In"
        })

    //Allows LoginButton to retrieve global state from App.js
    const [globalState, setGlobalState] = useContext(AppContext);

    const changeLoginStatus = () => {
        if(state.status==="logged-in") {
            setState ({
                ...state, 
                status: "logged-out",
                label: "Log in"
            });

            setGlobalState({
                ...globalState,
                loggedIn: "false"
            })

        } else {
            setState({
                ...state, 
                status: "logged-in",
                label: "Log out"
            });

            setGlobalState({
                ...globalState,
                loggedIn: "true"
            })
        }

    }

    return (
        <button onClick={changeLoginStatus} type="button" className="btn btn-primary">{state.label}</button>
    )
}

export default LoginButton;