import { UserModel } from "../../DB/models/user/userModel.js"
import { verifyToken } from "../modules/utils/genarate&veraifayToken.js"



export const AuthMiddleware=async(req,res,next)=>{

try {
    const {authration}=req.headers
    console.log(authration);
    if(!authration?.startsWith("abdrabo__")){
        res.json({message:"token not valide" })
    }   

    const token=authration.split("abdrabo__")[1]
    if(!token){
         res.json({message:"token not valide2" })
    }

    const decoded=verifyToken({token,signature:process.env.signature_token})

    if(!decoded?.id){
        res.json({message:"token not verifyed" })
    }
    /// بعد كدا هنسيرش ع الداتا و نرجع الي احنا عايزينوا و بعدها نبعتوا ف الريكوست 
    //و نعمل نكست و نروح نعمل بيدج البروفايل و بعدلها نحط الميدل وير ف الروتنج
    const data=await UserModel.findById(decoded.id).select('userName password email status role')
    if(!data){
        res.json({message:"not register Account" })
    }
    req.user=data
    return next()
} catch (error) {
    res.json({message:"catch error",error,stack:error.stack})
}
}