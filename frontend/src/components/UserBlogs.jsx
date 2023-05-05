import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog';

export default function UserBlogs() {
  const [user, setUser] = useState()
  const id = localStorage.getItem('userId')
  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch((err) => console.log(err))
    /* const res = await axios.get(`https://mern-blog-app-2022.herokuapp.com/api/blog/user/${id}`).catch((err) => console.log(err)) */
    const data = await res.data
    //console.log(data.user.blogs)
    return data
  }
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user))
    
  }, [])
  //console.log(user)  

  return (
    <div>
    {" "}
    {user && user.blogs && user.blogs.map((blog, index) => (
    <Blog key={index} blogId={blog._id} isUser={true} title = {blog.title} description ={blog.description} imageURL = {blog.image} userName = {user.name} blog_Date = {blog.updatedAt}/>  // or key={blog._id} 
    )) }
  </div>
  )
} 
