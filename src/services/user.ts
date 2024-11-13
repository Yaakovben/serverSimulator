import { compare, hash } from "bcrypt";
import { LoginDto, Register } from "../types/userDTO";
import User from '../models/user'
import jwt from 'jsonwebtoken'


export const createNewUser = async (user: Register) => {
    try {
      if(!user.password || !user.username || !user.organition) throw new Error("Missing user data, is require")
      const encPass = await hash(user.password, 10);
      user.password = encPass;
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



  ///

  