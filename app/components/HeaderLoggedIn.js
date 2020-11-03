import React, { useEffect, useContext } from "react";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Search from "./search/Search";

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
        data-for="search"
        data-tip="Search"
        onClick={handleSearchIcon}
        href="#"
        className="text-white mr-2 header-search-icon"
      >
        <i className="fas fa-search"></i>
      </a>{" "}
      <ReactTooltip place={"bottom"} id={"search"} className="custom-tooltip" />
      <span
        data-for="chat"
        data-tip="Click to chat"
        className="mr-2 header-chat-icon text-white"
      >
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>{" "}
      <ReactTooltip place={"bottom"} id={"chat"} className="custom-tooltip" />
      <Link
        data-for="my-profile"
        data-tip="View profile"
        to={`/profile/${appState.user.username}`}
        className="mr-2"
      >
        {" "}
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <ReactTooltip
        place={"bottom"}
        id={"my-profile"}
        className="custom-tooltip"
      />
      <a
        data-for="create-post"
        data-tip="Create a new post"
        className="btn btn-sm btn-success mr-2"
        href="/create-post"
      >
        Create Post
      </a>{" "}
      <ReactTooltip
        place={"bottom"}
        id={"create-post"}
        className="custom-tooltip"
      />
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
