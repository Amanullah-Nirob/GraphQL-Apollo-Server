import Dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import UserModel from '../models/UserModel.js'
Dotenv.config()


export const context = async({req})=>{
    const { authorization } = req.headers;
    if(authorization){
       const decodedUser = jwt.verify(authorization, process.env.JWT_SECRET);
       req.user = await UserModel.findById(decodedUser.id).select("-password");
       // console.log(req.user);
       return req.user
    }
}
