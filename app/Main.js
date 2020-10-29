import React, { useState, useReducer } from "react"
import {useImmerReducer} from "use-immer"
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

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

Axios.defaults.baseURL = "http://localhost:8080"

function Main() {

  const initialState={
    loggedIn : Boolean(localStorage.getItem("complexappToken")),
    flashMessages : []
  }

  function ourReducer(draft,action) {
    switch (action.type){
      case "login" :
        draft.loggedIn=true;
        return
      case "logout" :
        draft.loggedIn=false;
        return
     case "flashMessage" :
       draft.flashMessages.push(action.value)
        return 
    }
  }

  

  const [state,dispatch]= useImmerReducer(ourReducer,initialState);


  return (
    
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
      <BrowserRouter>
        <FlashMessages messages={state.flashMessages} />
        <Header />
        <Switch>
          <Route path="/" exact>
            {state.loggedin ? <Home /> : <HomeGuest />}
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
      </DispatchContext.Provider>
      </StateContext.Provider>
    
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))
