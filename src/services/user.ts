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

  export const initDatabase = async () => {
    try {
      const users = [
        {
          "name": "IDF - North",
          "resources": [
            {
              "name": "Iron Dome",
              "amount": 25
            },
            {
              "name": "David's Sling",
              "amount": 15
            }
          ],
          "budget": 8000000
        },
        {
          "name": "IDF - South",
          "resources": [
            {
              "name": "Iron Dome",
              "amount": 30
            },
            {
              "name": "Patriot",
              "amount": 20
            }
          ],
          "budget": 9000000
        },
        {
          "name": "IDF - Center",
          "resources": [
            {
              "name": "Iron Dome",
              "amount": 40
            },
            {
              "name": "Arrow",
              "amount": 10
            }
          ],
          "budget": 10000000
        },
        {
          "name": "IDF - West Bank",
          "resources": [
            {
              "name": "Iron Dome",
              "amount": 10
            }
          ],
          "budget": 7000000
        },
        {
          "name": "Hezbollah",
          "resources": [
            {
              "name": "Fajr-5",
              "amount": 20
            },
            {
              "name": "Zelzal-2",
              "amount": 10
            }
          ],
          "budget": 3000000
        },
        {
          "name": "Hamas",
          "resources": [
            {
              "name": "Qassam",
              "amount": 50
            },
            {
              "name": "M-75",
              "amount": 30
            }
          ],
          "budget": 2500000
        },
        {
          "name": "IRGC",
          "resources": [
            {
              "name": "Shahab-3",
              "amount": 15
            },
            {
              "name": "Fateh-110",
              "amount": 25
            }
          ],
          "budget": 4000000
        },
        {
          "name": "Houthis",
          "resources": [
            {
              "name": "Badr-1",
              "amount": 20
            },
            {
              "name": "Quds-1",
              "amount": 15
            }
          ],
          "budget": 2000000
        }
      ]
  
      for (const user of users) {
        const newUsers = new User(user);
        await newUsers.save();
      }
    } catch (err) {
      console.log(
        "Error accured while creating initial state of candidates",
        err
      );
    }
  };
  
  





