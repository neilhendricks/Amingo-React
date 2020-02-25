import React, {useState, useContext} from 'react';
import AppContext from "./AppContext";
//Always import useContext and Appcontext together

const LoginForm = () => {

    let email, password; // declaring variables, not assigning value

    //local state
    const [state, setState] = useState (
        {loginSucess:null}
    )

    //conneting to global state
    const [globalState, setGlobalState] = useContext (AppContext)// App context is a react component built into react library


    const loginUser = async () => { //first arguement is route
        let response = await fetch('http://localhost:3001/users/login', {
            method: 'POST',// second arguement is method, body, and headers
            body: JSON.stringify( // stringify to convert body to string
                {
                    email: email.value,
                    password: password.value,
                }
            ),
            headers: {
                "Content-Type": "application/json"//Telling backend this is a JSON data type
            }
        });

        let json = await response.json();   
        if (json.token){ //if email and password is valid..
        //Change the local state
        setState({...state, loginSuccess: true})

        //Change the global state
        setGlobalState({...globalState, loggedIn:"true", userid: json.userid})
        
        //saves token to your hard drive, so even if user closes tab, they are still loggedin
        sessionStorage.setItem("jwt", json.token)// sessionStorage is a global variable to the browser
        sessionStorage.setItem("userid", json.userid)
        }
    }

    return(
        <div className="registration-form container">
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input 
                    ref={(inputElem)=>email = inputElem}
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email" 
                />

            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input 
                    ref={(inputElem)=>password = inputElem}
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Password" 
                />
            </div>

            <button 
                onClick={loginUser}
                type="submit" 
                className="btn btn-primary"
            >Login</button>
            {
                state.loginSuccess &&
                <div 
                    className="alert alert-success" 
                    role="alert" 
                >
                    You are now logged in!
                </div>
            }
        </div>        
    )
}

export default LoginForm;