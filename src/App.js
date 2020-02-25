import React, { useState, useEffect, useContext } from "react";
import Jumbotron from "./Jumbotron";
import Feed from './Feed';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import AppContext from './AppContext';// Context component has two states- consumer and provider
import PostComment from './PostComment';

// we are passing logo as a prop in the NavBar component
const App = () => {

   const [state, setState] = useState(
        {
            posts: [],
            loadMore: false,
            timestamp: null,
            postsLoaded: false,
            paginate: false
        }
   )

   const [globalState, setGlobalState] = useContext(AppContext);

   const loadMore = () => {

        if(state.posts.length > 1) {
            // Updating state to trigger the fetch request
            setState({
                ...state,//the ... copies entire object {posts, loadMore, and timestamp}
                postsLoaded: false,
                paginate: true
            });
        }
   }
  
   useEffect(()=>{// useEffect allows us to control how and when fetch function is executed to avoid infinte loop
        if(!state.postsLoaded) {
            // Make fetch request to backend
            fetch('http://localhost:3001/feed/all', {
                method: 'POST',
                body: JSON.stringify({
                    timestamp: state.paginate ? //
                               state.posts[ state.posts.length - 1 ].date : 
                               null
                }),
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization" : "Bearer ".concat(sessionStorage.getItem("jwt"))
                }
            })//Promise: requesting data from backend
            // Run .json() to convert the backend response
            .then(response => response.json())
            // Change the state for posts array
            .then(json=>{
                setState({ 
                    ...state, 
                    posts: json,
                    postsLoaded: true,
                });
                console.log(json)
            })
            .catch(e=>console.log('error', e))
        }
   });

  //AppContect component can only have one prop
  return (
//took AppContext.Provider and put it in Main.js
        <div className="page">
        <Jumbotron 
            title="AMINGO"
            lead="Welcome to Amingo, a cool, VERY SIMPLE, social media platform"
            moreInfo="Create an account with Amingo, or log in below"
            buttonLabel="Signup"
        />

        { globalState.loggedIn === 'true' &&  <PostComment callback={()=>setState({...state, postsLoaded: false})} /> }
        
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
                        buttonLabel={
                            post.likes.includes(globalState.userid) ? 'Unlike' : 'Like' //two types of button labels
                        }
                        />
                    )
                }

                <center>
                    <button onClick={loadMore} className="btn btn-primary">Load More</button>
                </center>
            </div>
        }

        

        </div>   
  );
};

export default App;
