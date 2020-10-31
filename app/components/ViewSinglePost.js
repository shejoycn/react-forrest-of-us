import React, { useEffect, useState } from "react"
import Page from "./Page"
import Axios from "axios"

import Loading from "./Loading"
import {useParams} from "react-router-dom"
function ViewSinglePost() {

  const [isLoading, setIsLoading]=useState(true)
  const [post, setPost] = useState()
  const {id}=useParams();

    useEffect(()=>{
        async function fetchData()
        {
            try{
                const response = await Axios.get(`/post/${id}`)
                console.log(response.data)
                setPost(response.data)
                
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
   return (<Loading></Loading>)

        const date = new Date(post.createdDate)
        const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title={`Post : ${post.title}`}>
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <a href="#">
          <img className="avatar-tiny" src={post.author.avatar} />
        </a>
        Posted by <a href="#">{post.author.username}</a> on {dateFormatted}
      </p>

      <div className="body-content">
        <p>
         {post.body}
         </p>
        </div>
    </Page>
  )
}

export default ViewSinglePost
