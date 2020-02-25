import React, {useContext} from "react"
import AppContext from "./AppContext"

const Overlay = () => {
    const [globalState, setGlobalState] = useContext(AppContext);

    const theClass = globalState.sidebarOpen ? 'overlay open' : 'overlay';

    const closeSidebar = () => {
        setGlobalState({...globalState, sidebarOpen: false})
      }
    
    return (
        <div onClick={closeSidebar} className={theClass} />
    )
}

export default Overlay;