//set up schema for database
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' 
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength:20,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:6,
        select:false,
    },
    email:{
        type:String,
        required:[true,'Please provide valid email'],
        validate:{
            validator:validator.isEmail,//function "it will be invoked when user is created "
            message:'Please provide valid Email',
        },
        
        unique:true,
    },
    lastName:{
        type:String,
        trim:true,
        maxlength:20,
        default:'lastName',
    },
    location:{
        type:String,
        trim:true,
        maxlength:20,
        default:'my city',
    },
})
//setting up mongoose middleware before saving user
UserSchema.pre('save',async function(){
    console.log(this.password);
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
UserSchema.methods.createJWT=function (){
    return jwt.sign({userID:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME,})
}
export default mongoose.model('User',UserSchema);