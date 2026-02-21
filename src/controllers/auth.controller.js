const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")

async function userRegisterController(req,res){
    const{email , name, password} = req.body
    const isExist = await  userModel.findOne({
        email:email
    })

    if(isExist){
        return res.status(422).json({
            message:"User alredy exist",
            status:"failed"
        })
    }

    const user = await userModel.create({
        email,password,name 
    })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
}

module.exports = {
    userRegisterController
}