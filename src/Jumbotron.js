import React, { useState } from 'react';
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const Jumbotron = ({title, lead, moreInfo, buttonLabel}) => {
    let emailField; // Later becomes a ref to the component
    
    const [state, setState] = useState({
        registration: "start"
    }) //Array

    const registerUser = () => {
        if(validateEmail(emailField.value)) 
        {
        setState({...state, registration: "correct"})
        }else {
            setState ({...state, registration: "incorrect"})
        }
    }
    return(
        <div className="jumbotron">
            <h1 className="display-4">{title}</h1>
            <p className="lead">{lead}</p>
            <hr className="my-4" />
            <p>{moreInfo}</p>
            <div className="input-group" style={{width: '600px', margin: '0 auto'}}>
                <input ref={(elem)=>emailField = elem} type="text" className="form-control"/>
                <button 
                onClick={registerUser}
                className="btn btn-primary" href="#" role="button">
                    {buttonLabel}
                </button>
            </div>
            { /*conditional rendering below: if state.registration = correct, then run the div */
                state.registration === "correct" && <div class="alert alert-success" role="alert" style={{width: '600px', margin: '10px auto'}}>
                    You have been successfully registered!
                </div> 
            }
            { 
                state.registration === "incorrect" && <div className="alert alert-danger" role="alert" style={{width: '600px', margin: '10px auto'}}>
                    You have entered an incorrect email!
                </div> 
            }
        </div>
    )
}
export default Jumbotron;