import { compare, hash } from "bcrypt";
import { LoginDto, Register } from "../types/userDTO";
import User from '../models/user'
import jwt from 'jsonwebtoken'
import Ammuntion from "../models/Ammuntion";

export const createNewUser = async (user: Register) => {
    try {
      console.log("YNAL ABUK")
      if(!user.password || !user.username || !user.organition) throw new Error("Missing user data, is require")
      const encPass = await hash(user.password, 10);
      user.password = encPass;
       let ammuntionFromDb
       if(user.organition =="IDF"){
         console.log(user.organition);
         if(!user.location) throw new Error("Missing Location data, is require")
          ammuntionFromDb = await Ammuntion.findOne({ name: user.location }).lean();
      }else{
        ammuntionFromDb = await Ammuntion.findOne({ name: user.organition }).lean();
    }
    if(ammuntionFromDb){
    user.ammuntion = ammuntionFromDb.resources
    }
      const newUser = new User(user);
      return await newUser.save();
      
    } catch (err) {
      console.log(err);
      throw new Error("Can't create new user");
    }
  };
  
  export const userLogin = async (user: LoginDto) => {
    try {
      const userFromDatabase = await User.findOne({ username: user.username }).lean();
      if (!userFromDatabase) throw new Error("user not found");
      const match = await compare(user.password, userFromDatabase.password);
      if (!match) throw new Error("wrong password");
      // get token 
      const token = jwt.sign({
        user_id: userFromDatabase._id,
        organition: userFromDatabase.organition,
        username: userFromDatabase.username
      },process.env.JWT_SECRET!,
    {
      expiresIn:"10m"
    }
  ); 
      return {...userFromDatabase, token, password:"********"};
    } catch (err) {
      throw err;
    }
  };



 
