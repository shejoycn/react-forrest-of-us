import React, { useContext, useEffect, useState } from "react"

import StateContext from "../StateContext"
import Page from "./Page"
import {useParams, Link} from "react-router-dom"
import Axios from 'axios'

function ProfilePosts(props) {

    const [isLoading, setIsLoading]=useState(true)
    const [posts, setPosts] = useState([])
    const {username}=useParams();

    useEffect(()=>{
        async function fetchData()
        {
            try{
                const response = await Axios.get(`/profile/${username}/posts`)
                console.log(response.data)
                setPosts(response.data)
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
       
      <div className="list-group">
{posts.map(post =>{
        const date = new Date(post.createdDate)
        const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
return(
        <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
          <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong>
          <span className="text-muted small">{` `}on {dateFormatted}</span>
        </Link>
        )})}
      </div>
        )
}


export default ProfilePosts


  