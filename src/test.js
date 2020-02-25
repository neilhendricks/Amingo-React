import React, {useState, useEffect, useContext} from 'react';
import NavBar from "./NavBar";
import Jumbotron from "./Jumbotron"
import Feed from "./Feed"
import CounterButton from "./CounterButton"
import RegistrationForm from "./RegistrationForm"
import AppContext from "./AppContext";// Context component has two states- consumer and provider
import LoginForm from "./LoginForm";
import PostComment from "./PostComment";
/*
const posts = [
  {
    title:"The Pokeball",
    lead: "Welcome",
    moreInfo: "More info"
  },
  {
    title:"Another Pokeball",
    lead: "Welcome",
    moreInfo: "More info"
  },
  {
    title:"One more Pokeball",
    lead: "Welcome",
    moreInfo: "More info"
  }
] */

// we are passing logo as a prop in the NavBar component
function App() {
  
  const [state, setState] = useState(
    {
      posts: [],
      timestamp: null,
    }
  )
  
  const [globalState, setGlobalState] = useContext(AppContext)
  
  const loadMore = () => {
    
    if (state.posts.length >1) {
      setGlobalState({
        ...globalState,//... copy entire object
        postsLoaded: false
        }) 
    }
}
  //removed globalstate that was here and put it into Main.js

  useEffect(()=>{// useEffect allows us to control how and when fetch function is executed to avoid infinte loop
    if(!globalState.postsLoaded) {
      fetch("http://localhost:3001/feed/all", {
        method: "POST",
        body: JSON.stringify ({
          timestamp:
          state.posts > 0 ? [state.posts.length-1].date : null
      }),
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer ".concat(sessionStorage.getItem("jwt"))
      }
      }) //Promise: requesting data from backend
    .then(response => response.json())//Promise: convert backend response to json
    .then(json =>{ //Change the state for posts array
      setState({
        ...state,
        posts: json,
        
      });
      setGlobalState({
        ...globalState,
        postsLoaded: true,
      })
      console.log(json)
    })
    .catch(e=>console.log("error", e))
    }
  });
    
  //AppContect component can only have one prop
  const isLoading=false;
  return (
     //took AppContext.Provider and put it in Main.js
    <div className="App">
      <Jumbotron 
        title="The Title"
        lead="Welcome to ABC.com, the biggest"
        moreInfo="Click here to learn more about learning ABC"
        buttonLabel="Start"
      />
      
      { globalState.loggedIn === 'true' && <PostComment />}
      { globalState.loggedIn !== 'true' && <LoginForm />}

      { 
      globalState.loggedIn === 'true' && // check to see if user is logged in
          <div className="container">        
              { 
                  state.posts.map( //state.posts is an array of object, the documents in the backend, all of the social media posts we have, and we are mapping through it
                      (post)=><Feed //sequence below is does not need to be ordered in anyway
                      _id={post._id} 
                      image={post.image}
                      title={post.username}
                      description={post.comment}
                      buttonLabel={post.likes.includes(globalState.userid) ? "Unlike" : "Like"} //two types of button labels
                      />
                  )
              }
              <center>
                <button onClick={loadMore} className="btn btn-primary">Load More</button>
              </center>
          </div>
      }

      <div className="container">
      <CounterButton />
        {
          isLoading && <p>Loading...</p>
        }
        
        
      </div>
    </div>
    
    )
}

export default App;