
import { Router } from "express";
import * as auth from "../auth/controler/auth.controler.js"
import { errorHandling } from "../utils/errorHandling.js";
import { valaidationMiddle } from "../../Middleware/validation.js";
import * as Schema from "./controler/auth.validation.js";


const  AuthRouter=Router();

AuthRouter.post("/signUP",valaidationMiddle(Schema.sginUpSchema),errorHandling(auth.signUP))
AuthRouter.get("/confirmEmail/:token",errorHandling(auth.confirmEmail))
AuthRouter.get("/SendAgin/:token",errorHandling(auth.SendAgin))

AuthRouter.post("/login",auth.LogIn)


export default AuthRouter