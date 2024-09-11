import { Router } from "express";
import { errorHandling } from "../utils/errorHandling.js";
import {getMessage, sendMassage ,updatePassword,deletMassage} from "./controler/message.controler.js";
import { AuthMiddleware } from "../../Middleware/auth.Middle.js";

export const  messageRouter=Router()

messageRouter.post('/:id',errorHandling(sendMassage) )

messageRouter.get("/getMessages",AuthMiddleware,errorHandling(getMessage))
messageRouter.patch("/updatePassword",AuthMiddleware,errorHandling(updatePassword))
messageRouter.delete("/delete",AuthMiddleware,errorHandling(deletMassage))