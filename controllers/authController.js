//controller contain logic to all route which is specifies in routes folder 

import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
//async -> because we are interacting with our database
import {BadRequestError} from '../errors/index.js'
const register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name ||!email||!password){
        throw new BadRequestError('please provide all values')
    }
    //check for unique email
    const userAlreadyExists=await User.findOne({email});
    if(userAlreadyExists){
        throw new BadRequestError('Email already in use');
    }
    const user=await User.create({name,email,password})
    //once we create the user before we send back we'll invoke JWT
    const token=user.createJWT()
    res.status(StatusCodes.OK)
    .json({
        user:{
            email:user.email,
            lastName:user.lastName,
            location:user.location,
            name:user.name
        },
        token,
        location:user.location,
    })
   
}
const login=async(req,res)=>{
    res.send('login user');
}
const updateUser=async(req,res)=>{
    res.send('update User');
    // //user.save()
    // User.findOneaUpdate()
}
export {register,login,updateUser}