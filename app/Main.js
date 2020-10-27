import React, { useState, useReducer } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import About from "./components/About"
import CreatePost from "./components/CreatePost"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./components/Home"
import HomeGuest from "./components/HomeGuest"
import Terms from "./components/Terms"
import Axios from "axios"
import ViewSinglePost from "./components/ViewSinglePost"
import FlashMessages from "./components/FlashMessages"

import ExampleContext from "./ExampleContext"

Axios.defaults.baseURL = "http://localhost:8080"

function Main() {

  const initialState={
    loggedIn : Boolean(localStorage.getItem("complexappToken")),
    flashMessages : []
  }

  function ourReducer(state,action) {
    switch (action.type){
      case "login" :
        return {
          loggedIn : true,
          flashMessages : state.flashMessages
        };
      case "logout" :
        return {
          loggedIn : false,
          flashMessages : state.flashMessages
        };
     case "flashMessage" :
        return {
          loggedIn : state.loggedIn,
          flashMessages : state.flashMessages.concat(action.value)
        };

    }
  }

  

  const [state,dispatch]= useReducer(ourReducer,initialState);

  const [loggedin, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))
  const [flashMessages, setFlashMessages] = useState([])
  //

  function addFlashMessage(msg) {
    setFlashMessages(prev => prev.concat(msg))
  }
  return (
    <ExampleContext.Provider value={{addFlashMessage,setLoggedIn}}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedin={loggedin} />
        <Switch>
          <Route path="/" exact>
            {loggedin ? <Home /> : <HomeGuest />}
          </Route>
          <Route path="/about-us" exact>
            <About />
          </Route>
          <Route path="/create-post" exact>
            <CreatePost/>
          </Route>
          <Route path="/post/:id" exact>
            <ViewSinglePost />
          </Route>
          <Route path="/terms" exact>
            <Terms />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </ExampleContext.Provider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))
