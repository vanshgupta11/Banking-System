const userModel = require('../models/user.model')

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
}

module.exports = {
    userRegisterController
}