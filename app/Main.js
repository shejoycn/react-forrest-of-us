import React, { useState } from "react"
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

Axios.defaults.baseURL = "http://localhost:8080"

function Main() {
  const [loggedin, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")))
  const [flashMessages, setFlashMessages] = useState([])

  function addFlashMessage(msg) {
    setFlashMessages(prev => prev.concat(msg))
  }
  return (
    <BrowserRouter>
      <FlashMessages messages={flashMessages} />
      <Header loggedin={loggedin} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedin ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/about-us" exact>
          <About />
        </Route>
        <Route path="/create-post" exact>
          <CreatePost addFlashMessage={addFlashMessage} />
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
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))
