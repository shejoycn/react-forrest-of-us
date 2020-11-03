import React, { useEffect, useContext } from "react";
import Axios from "axios";
import DispatchContext from "../../DispatchContext";
import { Link } from "react-router-dom";

import { useImmer } from "use-immer";
import Loading from "../Loading";

function Search(props) {
  const appDispatch = useContext(DispatchContext);

  const [state, setState] = useImmer({
    searchTerm: "",
    results: [],
    show: "neither",
    requestCount: 0,
  });

  function handleInput(e) {
    const value = e.target.value;
    setState((draft) => {
      draft.searchTerm = value;
    });
  }

  useEffect(() => {
    document.addEventListener("keyup", searchKeyPressHandler);

    return;
  }, []);

  useEffect(() => {
    if (state.searchTerm.trim()) {
      setState((draft) => {
        draft.show = "loading";
      });
      const delay = setTimeout(() => {
        setState((draft) => {
          draft.requestCount++;
        });
      }, 700);

      return () => {
        clearTimeout(delay);
      };
    } else {
      setState((draft) => {
        draft.show = "neither";
      });
    }
  }, [state.searchTerm]);

  useEffect(() => {
    if (state.requestCount) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post(
            `/search`,
            {
              searchTerm: state.searchTerm,
            },
            { cancelToken: ourRequest.cancelToken }
          );
          console.log(response.data);
          setState((draft) => {
            draft.results = response.data;
            draft.show = "results";
          });
        } catch (e) {
          console.log(e);
        }
      }

      fetchResults();

      return () => ourRequest.cancel();
    }
  }, [state.requestCount]);

  function searchKeyPressHandler() {}

  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input
            onChange={handleInput}
            autoFocus
            type="text"
            autoComplete="off"
            id="live-search-field"
            className="live-search-field"
            placeholder="What are you interested in?"
          />
          <span
            onClick={() => appDispatch({ type: "closeSearch" })}
            className="close-live-search"
          >
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>
      <></>
      <div className="search-overlay-bottom">
        <div className="container container--narrow py-3">
          {state.show == "loading" ? (
            <Loading />
          ) : (
            <div className="live-search-results live-search-results--visible">
              <div className="list-group shadow-sm">
                <div className="list-group-item active">
                  <strong>Search Results</strong> ({state.results.length}{" "}
                  item(s) found)
                </div>
                {state.results.map((post) => {
                  const date = new Date(post.createdDate);
                  const dateFormatted = `${
                    date.getMonth() + 1
                  }/${date.getDate()}/${date.getFullYear()}`;
                  return (
                    <Link
                      onClick={() => appDispatch({ type: "closeSearch" })}
                      key={post._id}
                      to={`/post/${post._id}`}
                      className="list-group-item list-group-item-action"
                    >
                      <img className="avatar-tiny" src={post.author.avatar} />{" "}
                      <strong>{post.title}</strong>
                      <span className="text-muted small">
                        {` `}on {dateFormatted}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
