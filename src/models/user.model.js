const mongoose =  require('mongoose');
const bcrypt = require("bcryptjs")


const userSchema = mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:[true,"Email is required for creating an account"],
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , "invalid email"],
        unique:[true,"email already exist"]
    },

    name:{
        type:String,
        required:[true,"Name is required"]
    },

    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[6,"password should have minimum six characters"],
        select:false
    }

},{
    timestamps:true
}) 

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return 
    }

    const hash = await bcrypt.hash(this.password , 10) 
    this.password = hash

    return 
})

userSchema.methods.comparePasswords = async function(password){
    return await bcrypt.compare(password , this.password)

}

const userModel = mongoose.model("user",userSchema)

module.exports = userModel