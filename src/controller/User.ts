import { prismaClient } from "../lib/db";
import { Response, Request } from "express";
import apicache from "apicache";

export default class User {
  static GET_ALL_USERS = async (req: Request, res: Response) => {
    (req as any).apicacheGroup = "allusers";
    const data = await prismaClient.user.findMany();
    let newProm = new Promise<void>((res, reject) => {
      setTimeout(() => {
        res();
      }, 2000);
    });
    await newProm;
    return res.json(data);
  };
  static CREATE_NEW_USER = async (req: Request, res: Response) => {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.json({
        message: "Please Fill All Inputs !",
      });
    }
    const isUserExist = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (isUserExist) {
      return res.json({
        message: "User Already Exists !",
      });
    }
    const newUser = await prismaClient.user.create({
      data: {
        email,
        password,
      },
    });
    console.log(req.params.target, "req.params.target");
    apicache.clear("allusers");
    res.json(newUser);
  };

  static GET_SINGLE_USER = async (req: Request, res: Response) => {
    const { email } = req.params;
    if (!email) {
      return res.send("Enter Email !");
    }
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    res.json(user);
  };
}
