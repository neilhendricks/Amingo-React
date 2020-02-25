import React, {useState} from "react"
const CounterButton = () => {
/*const [state, setState] is deconstructing an array, and we get it from useState*/
    const [state, setState] = useState(0) /* the argument passed in useState is the defaulte state */
    const changeNumber = () => { 
        let newState = state +1
        setState(newState)
    }
    return (
    <button onClick={changeNumber}>{state}</button>
    )
    
}

export default CounterButton;