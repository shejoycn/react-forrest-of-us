import React, { useContext, useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import Axios from 'axios'

import StateContext from "../StateContext"
import Page from "./Page"
import ProfilePosts from  './ProfilePosts'




function Profile(props) {
    const [isLoading, setIsLoading]=useState(true)
    const [profileData, setProfileData] = useState({
        counts:{ 
            followerCount: "",
            followingCount:"",
            postCount : ".."
        },
        profileAvatar : "https://gravatar.com/avatar/placeholder?s=128",
        profileUsername : ".."
    })
 const appState = useContext(StateContext)
 const {username}=useParams();

 useEffect(()=>{
     async function fetchData()
     {
        try{
            const response = await Axios.post(`/profile/${username}`, {token:appState.user.token})
            setProfileData(response.data)
            setIsLoading(false)
        }
        catch(e)
        {
            console.log(e)
        }
     }

     fetchData()
 }
 ,[])

 if(isLoading)
 return (<div>Loading data.....</div>)

 else
    return (
        <Page title={`Profile Page : ${username}`}>
    <div className="container container--narrow py-md-5">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} /> {username}
        <button className="btn btn-primary btn-sm ml-2">Follow <i className="fas fa-user-plus"></i></button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following:  {profileData.counts.followingCount}
        </a>
      </div>

     <ProfilePosts />
    </div>
    </Page>
        )
}

export default Profile


  