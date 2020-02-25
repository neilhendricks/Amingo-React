import React, {useState} from "react";

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const RegistrationForm = () => {

    // creating variables to be used as pointers to input fields
    let firstName, lastName, email, password, occupation, termsConditions;

    const [state, setState] = useState (
        {
            errors: [],
            registrationSuccess: false
        })
        

        const validateForm = () => {
            //This array will replace what's inside the state
            const errors = [];

            
            if(firstName.value.length === 0) {
                errors.push("Please enter your first name")
            }
            if(lastName.value.length === 0) {
                errors.push("Please enter your last name")
            }
            if(!validateEmail(email.value)) {
                errors.push("Please enter your email")
            }
            if(password.value.length <8 ) {
                errors.push("Please enter a password with 8 or more characers")
            }
            if(!termsConditions.checked) {
                errors.push("Please accept the Terms and Conditions")
            }

            setState({...state, errors:errors})// ... copiess all states
            return errors;
        }

    const registerUser = () => {
        if(validateForm().length === 0) {
        //Step 1. Configure fetch and post data to amingo
        //by default, all fetch requests are get requests
        fetch("http://localhost:3001/users/register", { //Remeber- all fetch functions are promises
            method: "POST", //spelling and uppercasing is IMPORTANT for everthying in this object
            body: JSON.stringify({// Remember, POST functions must have a body. Stringify converts object into String
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
                occupation: occupation.value
            }), //takes javascript object and turns it into a string that can later be converted back into a javascript object
            headers: {
                "Content-Type": "application/json"//format of body
            }
        })
        //Step 2. Convert backend response to json
        .then((response)=>response.json()) // this .then function is also asynchronus, so it also retruns a function
        //Step 3. Handle the json response
        .then(json=>{
            console.log("response from amingo", json)
            setState({...state, registrationSuccess: true, errors: []})
        })
        }
    }

   
    return (
        <div className="registration-form container">
            <div className="form-group">
                <label for="firstName">First Name</label>
                <input ref={(elem)=>firstName=elem}/* assign elem to first name*/ type="email" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Enter your first name"/>
            </div>
            <div className="form-group">
                <label for="lastName">Last Name</label>
                <input ref={(elem)=>lastName=elem} type="email" class="form-control" id="lastName" aria-describedby="emailHelp" placeholder="Enter you last name"/>
            </div>
            <div className="form-group">
                <label for="email">Email address</label>
                <input ref={(elem)=>email=elem} type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label for="password">password</label>
                <input ref={(elem)=>password=elem} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className="form-group">
                <label for="occupation">occupation</label>
                <input ref={(elem)=>occupation=elem} type="Occupation" class="form-control" id="Occupation" placeholder="Occupation"/>
            </div>
            <div className="form-group form-check">
                <input 
                    ref={(elem)=>termsConditions = elem}
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1" 
                />
                <label 
                    className="form-check-label" 
                    for="exampleCheck1">
                I accept the Terms &amp; Conditions
                </label>
            </div>
            {//truthy value, the expression below checks to see if regsucc is true, and button is an object, so
            //button is automatically true. It returns the right end of the expression, everything afer && which is button
            !state.registrationSuccess && // if the registration is successful, this takes away the submit button
            <button type="submit" className="btn btn-primary" onClick={registerUser}>Submit</button>
            }
            { state.errors.length > 0 &&
                <div className="alert alert-danger" role="alert">
                        Please correct the following errors:
                        <ul>
                            {
                                state.errors.map(
                                    (error)=><li>{error}</li>
                                )
                            }
                        </ul>
                </div>
            }

            {
                state.registrationSuccess &&
                <div 
                    className="alert alert-success" 
                    role="alert" 
                >
                    Your account has created successfully!
                </div>
            }

        </div>
        ) 
}

export default RegistrationForm;