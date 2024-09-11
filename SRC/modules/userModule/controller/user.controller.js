import { UserModel } from "../../../../DB/models/user/userModel.js"
import cloundinary from "../../utils/cloundinary.js"



export const updateProfilePic=async(req,res,next)=>{
    if(!req.file){
        return next(new Error('in-valid file',{cause:400}))
    }
    const userPic=await UserModel.findByIdAndUpdate(req.user._id,{profilePic:req.file.dest},{new:true})
    return res.status(200).json({message:"update done",userPic,file:req.file})

}

 export const profile=async(req,res)=>{

    const data=await UserModel.findById(req.user._id)

    res.json({message:"done",data: data})

}

export const shareProfile=async(req,res,next)=>{

    const{id}=req.params
   const user= await UserModel.findById(id).select("userName email phone age role status")
    if(!user){
        return next(new Error("id user not founed"),{cause:404})
    }
    return res.status(201).json({message:"done",user:user})

} 

export const updateCoverPic=async(req,res,next)=>{
 
    if(!res.file?.length){
        return next(new Error('in-valid file',{cause:400}))
    }
    const coverPic=[]
    for (const coverPic of req.file) {
        const {secure_url,public_id}=await cloundinary.uploader
        .upload(file.path,`user/${public_id}/cover`)

      coverPic.push({secure_url,public_id})  
    }


    const user=await UserModel.findByIdAndUpdate(req.user.id,{coverPic})
    return res.status(200).json({message:"update done",user})


}