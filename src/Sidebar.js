import React, {useContext} from "react"
import AppContext from "./AppContext"

const Sidebar = () => {
    
    const [globalState, setGlobalState] = useContext(AppContext);

    //If the global state for sidebarOpen is true, then you will have sidebar open, causing sidebar to move in from right
    const theClass = globalState.sidebarOpen ? "sidebar open" : "sidebar";

    const closeSidebar = () => {
        setGlobalState({...globalState, sidebarOpen: false})
      }

    return (
        <div className={theClass}>
            <button onClick={closeSidebar} className="btn btn-danger">Close</button>
        </div>
    )
}

export default Sidebar;