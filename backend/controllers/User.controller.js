const User = require('../models/User.model')
const bcrypt = require ('bcryptjs')
//const bcrypt = require ('bcrypt')




exports.getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find()       
    } catch (error) {
        return console.log(err)
    }
    if(!users){
        return res.status(404).json({message:"No users found"})
    }
    return res.status(200).json({users:users}) // or you can write json({users})
}


exports.signUp = async (req, res, next) => {
    const { name, email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({email:email})
    } catch (error) {
        return console.log(error)
    }
    if (existingUser){
        //alert("User already exists")
        return res.status(400).json({message:"User already exists"})
    }

    
    
    const user = new User({
        name,
        email,
        password,
        blogs:[]
    })

    /* Password Hashing using bcryptjs */

    const salt = bcrypt.genSaltSync(10);

    user.password = bcrypt.hashSync(user.password, salt);

    /* Password Hashing using bcrypt */
    
    // generate salt to hash password
    //const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    //user.password = await bcrypt.hash(user.password, salt)
    

    try {
        await user.save()
    } catch (error) {
        return console.log(error) 
    }
    return res.status(201).json({user:user})
}


exports.signIn = async (req, res,next) => {

    const { email, password } = req.body
    let existingUser
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        return console.log(error)
    }
    if (!existingUser){
        console.log("User not found")
        return res.status(404).json({message:"User not found"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect){
        console.log("Incorrect Password")
        
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message:"Login successful",user:existingUser})

}



