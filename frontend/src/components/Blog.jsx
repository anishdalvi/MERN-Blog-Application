import React from 'react'
import { Box, Card, CardContent, Typography, CardHeader, CardMedia, Avatar , IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment';
//import ObjectId from 'mongodb.ObjectID'
//var ObjectId = require('mongodb').ObjectID;




export default function Blog({title, description, imageURL, userName, isUser, blogId,blog_Date}) {
  //console.log(title,isUser)
  //console.log(blog_Date)

  var datefromMongo = new Date(blog_Date) 
  //console.log(datefromMongo)

  var formatedDate = moment(datefromMongo).format('DD/MM/YYYY hh:mm A')
  //console.log(formatedDate)


  const navigate = useNavigate()
  const handleEdit = (e) => {
      navigate(`/myBlogs/${blogId}`)
  }

  
  const deleteRequest = async () =>{
    //const res = await axios.delete(`https://mern-blog-app-2022.herokuapp.com/api/blog/${blogId}`).catch((err) => {console.log(err)})
    const res = await axios.delete(`http://localhost:5000/api/blog/${blogId}`).catch((err) => {console.log(err)})
    const data = await res.data
    const value = 1
    return data
  }


  const handleDelete = () => {

    deleteRequest().then((data) => {console.log(data)}).then(() => navigate("/blogs"))
    
  }
  
  return (
    <div>
    <Card  sx={{ border: 3,borderColor: '#ccc',width: "40%", margin:"auto", my:5, padding:2, boxShadow:"6px 6px 10px #ccc", borderRadius:5,
     "&:hover":{
        boxShadow:"10px 10px 50px #ccc",
    }, }}>

      { isUser && (
        <Box display="flex">
          <IconButton sx={{marginLeft:"auto"}} onClick={handleEdit} > <EditIcon color="primary" /></IconButton>
          <IconButton onClick={handleDelete }> <DeleteIcon color="primary" /> </IconButton>
        </Box>
      )}
      
      <CardHeader
        avatar={
          
              <Avatar sx={{ bgcolor: "blue", }}  > {/*width: 56, height: 56  */}
              {userName.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')}  {/* get the 1st letter of each word */}
              </Avatar> 
            
         
          
        }
        titleTypographyProps={{ fontSize:'18px' }}
        title={title}

        subheaderTypographyProps={{ fontSize:'15px' }}
        subheader={formatedDate}
        
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />



      <CardContent>
        <hr/>
        <br />
        <Typography variant="body2" color="text.secondary">
           <b>{userName}</b>{": "} {description}
        </Typography>
      </CardContent>
      
    </Card>
    </div>
  )
}
