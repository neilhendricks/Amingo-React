import React, {useContext} from "react";
import AppContext from "./AppContext"

const Contact = () => {
    const [globalState, setGlobalState] = useContext(AppContext);

    return (
        <div>
            <h1>Contact page</h1>
            <p>{globalState.userid}</p>
        </div>
    )
}

export default Contact;