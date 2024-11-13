import { Request, Response } from "express";
import { LoginDto, Register } from "../types/userDTO";
import { createNewUser, initDatabase, userLogin } from "../services/user";

export const register = async (req: Request<Register>, res: Response) => {
    try {
      const freshlyCreatedUser = await createNewUser(req.body)
      res.status(201).json(freshlyCreatedUser)
  } catch (err) {
    res.status(400).json((err as Error).message)
  }
};


export const login = async (req: Request<LoginDto>, res: Response) => {
    try {
      const loggedUser = await userLogin(req.body)
      res.status(200).json(loggedUser)
    } catch (err) {
      res.status(400).json((err as Error).message)
    }
  };


  export const sid = async (req: Request, res: Response) => {
    try {
      await initDatabase();
      res.sendStatus(201);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  };