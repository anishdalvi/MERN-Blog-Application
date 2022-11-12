const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//const bodyParser = require("body-parser")

const PORT = 5000
const app = express();

app.use(cors())


//app.use(bodyParser.urlencoded({ extended: true }));
//mongoose.connect(("mongodb://localhost:27017/blog-app-new"+"-replicaSet=rs")
mongoose.connect(("mongodb+srv://anish:1234@firstcluster.hnsxgmy.mongodb.net/blog-app?retryWrites=true&w=majority")
).then(()=> console.log("MongoDB connected")).catch((err)=> console.log(err))

app.use(express.json())

const userRouter = require('./routes/User.route')
app.use('/api/user',userRouter)


const blogRouter = require('./routes/Blog.route')
app.use('/api/blog',blogRouter)


app.listen(PORT, () => {
    console.log("Server Started at Port " + PORT)
})