import React, {useState} from "react";

const Feed = ({_id, image, title, description, buttonLabel}) => {

  //creating a state for like button: either like, loading, or dislike
  const [state, setState] = useState (
    { // 1 state- label( the key), 3 possible values to the key- Like, loading, or dislike
      label: buttonLabel    
    }
  )

  const like = async () => {

    setState({...state, label:"Loading..."})

    let response = await fetch("http://localhost:3001/feed/addlike", {
      method: "POST",
      body: JSON.stringify ({
        feedid: _id
      }),
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer ".concat(sessionStorage.getItem("jwt"))
      }
    })

    let json = await response.json()
    setState({...state, label:"Loading..."})
    console.log("Response from backend", json)
  }


  return (
    <div className="card" style={{"width": "18rem"}}>
        <img src={image}/>
        <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button onClick={like} href="#" className="btn btn-primary">{buttonLabel}</button>
        </div>
    </div>
    )
}

export default Feed;