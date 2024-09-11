import MessageModel from "../../../../DB/models/message/messageModel.js"
import { UserModel } from "../../../../DB/models/user/userModel.js"
import { HashText, combare } from "../../utils/Hash&Combare.js"



export const sendMassage=async(req,res,next)=>{

const{id}=req.params
 const{message}=req.body
const user=await UserModel.findById(id)
//console.log(user);

if(!user){
    return next(new error('id not exist',{cause:404}) )
}
const addMassage=await MessageModel.create({receiverID:id , message})


    res.status(201).json({message:"done", addMassage})
}

export const getMessage=async(req,res,next)=>{

console.log(req.user._id);
// هنا استخدمنا فايند بس مش فايند باي اي دي لان ال اي دي دا بتاع اليوزر مش المسدج
//اي دي =ID
    const userMessage=await MessageModel.find({receiverID:req.user._id})
    console.log(userMessage);
    res.status(201).json({message:"done",message:userMessage})
}


export const updatePassword=async(req,res,next)=>{
    const{oldPassword,newPassword}=req.body
;
const match=combare({planTEXT:oldPassword,hashValue:req.user.password})
    

    if(match){
     
        req.user.password=HashText({planTEXT:newPassword,SaltRound:process.env.SaltRound})
        await req.user.save()
        return res.status(201).json({message:"updated done"})
    }else{
        return next(new Error("password not match", {cause:400}))
    }
   
}

export const deletMassage=async(req,res,next)=>{
        const{id}=req.body
        // console.log(id);
        // console.log(req.user._id);
    const userMessage=await MessageModel.find({receiverID:req.user._id})
    // console.log(userMessage);
        if(!userMessage){
            return next(new Error("that id not exist",{cause:404}))
        }
    const deleted=await MessageModel.findByIdAndDelete({_id:id})
        if(!deleted){
            return next(new Error("that id message not exist",{cause:404}))
        }
        return res.status(201).json({message:"done"})
        
}