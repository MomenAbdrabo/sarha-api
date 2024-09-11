
import { Router } from "express";
import { AuthMiddleware } from "../../Middleware/auth.Middle.js";
import { profile,shareProfile, updateProfilePic } from "./controller/user.controller.js";
import { FileValidation, uploudFile } from "../utils/UploudFile.js";
import { FileValidation, uploudFile } from "../utils/cloudMulter.js";
import { errorHandling } from "../utils/errorHandling.js";

export const userRouter=Router()

userRouter.patch('/profilePic',AuthMiddleware,
uploudFile({customPath:'/user/profile' ,
validMimtype:FileValidation.image}).single('image'),
errorHandling(updateProfilePic)
)
userRouter.patch('/CoverPic',AuthMiddleware,
uploudFile({validMimtype:FileValidation.image}).single('image'),
errorHandling(updateCoverPic)
)
userRouter.get('/profile',AuthMiddleware,profile)
userRouter.get('/:id',shareProfile)