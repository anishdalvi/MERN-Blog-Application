import { Box, Typography, TextField, InputLabel, Button } from '@mui/material'
import React , { useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function AddBlog() {

  const labelStyles =  {mb:1, mt:2, fontWeight:"bold", fontSize:"20px"}
  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    title:"",
    description:"",
    imageURL:""
})
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value
  
}))
  }

  
  const sendRequest = async () => {
    /* const res = await axios.post("https://mern-blog-app-2022.herokuapp.com/api/blog/add",{ */
    const res = await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user : localStorage.getItem("userId")
    }). catch((err) => console.log(err))

    const data = await res.data
    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(inputs)
    sendRequest().then((data) => {console.log(data)}).then(() => navigate("/myBlogs"))
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} 
             borderColor="linear-gradient(90deg, rgba(6,5,57,1) 0%, rgba(0,129,255,1) 49%, rgba(6,35,41,1) 99%)" 
             borderRadius={10} boxShadow="10px 10px 20px #ccc"
             px={8} py={3} display={'flex'} flexDirection="column" width="50%" margin={"auto"} marginTop={10}
        >
          <Typography
            fontWeight="bold"
            padding={1}
            color="grey"
            variant="h3"
            textAlign="center"
          >
            Post Your Blog</Typography>
          <InputLabel sx= {labelStyles}   >Title</InputLabel>
          <TextField margin="normal" variant="outlined" name="title" value={inputs.title} onChange={handleChange} />
          <InputLabel sx= {labelStyles}  >Description</InputLabel>
          <TextField margin="normal" variant="outlined" name="description" value={inputs.description} onChange={handleChange} />
          <InputLabel sx= {labelStyles}  >Image URL</InputLabel>
          <TextField margin="normal" variant="outlined" name="imageURL" value={inputs.imageURL} onChange={handleChange} />
          <Button type="submit" sx={{mt:5, mr:"auto",ml:"auto", mb:4, p:1, borderRadius:4,background:'#0079f3', width:"250px", fontSize:"20px", fontWeight:"bold" }}  variant="contained">
            Post
          </Button>

          
        </Box>
      </form>
    </div>
  )
}
