import { Router } from "express";
import User from "../controller/User";
import apicache from "apicache";
let cache = apicache.middleware;

export const UsersRoute = Router();

UsersRoute.get("/", cache("5 minutes"), User.GET_ALL_USERS);

UsersRoute.post("/", User.CREATE_NEW_USER);

UsersRoute.get("/:email", User.GET_SINGLE_USER);
