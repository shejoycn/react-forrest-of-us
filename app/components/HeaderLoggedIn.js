import React, { useEffect, useContext } from "react";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

import { Link } from "react-router-dom";

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleSearchIcon(e) {
    e.preventDefault();
    appDispatch({ type: "openSearch" });
  }

  function handleLogout() {
    appDispatch({ type: "logout" });
  }
  return (
    <div className="flex-row my-3 my-md-0">
      <a
        onClick={handleSearchIcon}
        href="#"
        className="text-white mr-2 header-search-icon"
      >
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <a className="btn btn-sm btn-success mr-2" href="/create-post">
        Create Post
      </a>
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
