# MERN-Blog-Application

This is the **BLog Application** Web App developed using MERN Stack

I have used MongoDB Atlas as a Database

*The user can perform CRUD operations and can see the blogs posted by others.*

### **[View Demo](https://mern-blog-app-zzot.onrender.com)**

## Demo Images

![Demo Image 1](<frontend/src/assets/Project_Blog App Image 1.png>)

![Demo Image 2](<frontend/src/assets/Project_Blog App Image 2.png>)


## Before Running  this application
<p>Add your MONGODB ATLAS URI in **.env-example** in backend folder </p>
<p>Rename the .env-example file to **.env** </p>

## To run this application


#### To Run from Root Directory

`npm run dev` <br> (concurrently run server and client) <br>

or <br>

`npm run server`  (only run backend) <br>

`npm run client`  (only run frontend) <br>


#### To Run Backend
`npm --prefix backend start` (node) 

 or <br>
 
`npm --prefix backend run server` (with nodemon) 

 or <br>

`cd backend` <br>

`npm install` <br>

`npm start`

#### To Run Frontend

`npm --prefix frontend run client` <br>

or

`cd frontend` <br>

`npm install` <br>

`npm run dev`

*I have made this by watching this [Youtube Video](https://youtu.be/TFGEq5OZgaA)*