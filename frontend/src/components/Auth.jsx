import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, TextField, Typography, Button } from '@mui/material'
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

import axios from 'axios'

export default function Auth({isSignup,setisSignup}) {
    const navigate = useNavigate()
    //const [isSignup, setisSignup] = useState(false)
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange = (e) => {
        setInputs((prevState) => ({
                ...prevState,
                [e.target.name] : e.target.value
            
        }))
    } 

    const sendRequest = async (type="signin") => {
            /* const res = await axios.post(`https://mern-blog-app-2022.herokuapp.com/api/user/${type}`, { */
            const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
            name:inputs.name,
            email : inputs.email,
            password : inputs.password
        }).catch((err) => console.log("axios error : " + err));
        
       
        
        const data = await res.data
        //console.log(data);
        return data

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(inputs)
        if (isSignup){
            sendRequest("signup").then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => { dispatch(authActions.signin())}).then(() => navigate("/blogs"))
            .then(data => console.log(data))
        }
        else {
            sendRequest().then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => { dispatch(authActions.signin()) }).then(() => navigate("/blogs"))
            .then(data => console.log(data))
        }

    } 


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent={"center"}
                    maxWidth={400}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin='auto'
                    marginTop={5}
                    borderRadius={5}

                >
                    <Typography padding={3} textAlign="center" variant='h2' >
                        { isSignup ? "Sign Up" : "Sign In"} 
                    </Typography>
                    { isSignup &&  <TextField margin="normal" onChange={handleChange} name="name" placeholder="Name" value={inputs.name} />}
                    <TextField margin="normal" onChange={handleChange} name="email" placeholder="Email" type="email" value={inputs.email} />
                    <TextField margin="normal" onChange={handleChange} name="password" placeholder="Password" type="password" value={inputs.password} />
                    <Button type="submit" variant="contained" color="warning" sx={{margin:1,marginTop:3, borderRadius:3, background:'#0079f3'}}>
                        Submit
                    </Button>
                    <Typography sx={{margin:1,marginTop:3}}>
                        
                        { isSignup ? "Already have a account?" : "Do not have a account?"} 
                        <Button onClick={() => setisSignup(!isSignup)} > 
                            { isSignup ? "Sign In" : "Sign Up"} 
                        </Button>Here</Typography>
                    
                </Box>
            </form>
        </div>
    )
}
