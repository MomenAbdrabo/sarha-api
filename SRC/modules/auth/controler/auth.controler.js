import { UserModel } from "../../../../DB/models/user/userModel.js"
import { HashText, combare } from "../../utils/Hash&Combare.js"
import { generateToken, verifyToken } from "../../utils/genarate&veraifayToken.js"
import main from "../../utils/sendEmail.js"


export const signUP= async(req,res,next)=>{

 
//try {
  console.log(req.protocol,req.headers.host);
    const {email,password , userName}=req.body


    
    //check email 
    const checkEmail=await UserModel.findOne({email})
    //checkEmail=0
    if(checkEmail){
       // return res.json({message:"email exist"})
       return next(new Error('email exist'))
    } 
    const token=generateToken({payload:{email},signature:process.env.SGNEmail,expirend:60*5})
    const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const Newtoken=generateToken({payload:{email},signature:process.env.SGNEmail,expirend:60*5})
    const restartlink=`${req.protocol}://${req.headers.host}/auth/SendAgin/${Newtoken}`
    const html=`<a href=${link}>click to confirm Email</a> <br><br>
    
                <a href=${restartlink}> clic to restart email</a>
    `
    
   const confirm= main({
        to:`${email}`,
        subject:'welcom abdrabo cv',
        html,
        text:"hallo"

    })
    console.log(confirm);
    if(!confirm){
      return next(new Error('email not exist',{cause:400}))
    }
   const hashPass=  HashText({planTEXT:password,SaltRound:9})

       const AddUser=await UserModel.create({email,password:hashPass , userName})

       return res.json({message:"add done",user:AddUser._id})
//} catch (error) {
    //return res.json({message:"catch error",error,stack:error.stack })
//}
}

export const confirmEmail=async(req,res,next)=>{

  const{token}=req.params
  const decoded=verifyToken({token,signature:process.env.SGNEmail})
  
  const user =await UserModel.updateOne({email:decoded.email},{confirmEmail:true})

    return user.modifiedCount?res.status(200).redirect("https://www.facebook.com/momen.abdrabou/?locale=ar_AR")
                             :res.status(404).send("not reqister account")   
  

}

export const SendAgin=async(req,res,next)=>{
    const{token}=req.params
    const {email}=verifyToken({token,signature:process.env.SGNEmail})
    
    const newtoken=generateToken({payload:{email},signature:process.env.SGNEmail,expirend:60*2})
    const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${newtoken}`

    const restartlink=`${req.protocol}://${req.headers.host}/auth/SendAgin/${token}`
    const html=`<a href=${link}>click to confirm Email</a> <br><br>
    
                <a href=${restartlink}> clic to restart email</a>
    `
    
   const confirm= main({
        to:`${email}`,
        subject:'restart email',
        html,
        text:"hallo"

    })
    console.log(confirm);
    if(!confirm){
      return next(new Error('email not exist',{cause:400}))
    }
    return res.status(200).send("<p>chick your account</p>")

}





export const LogIn=async (req,res)=>{

try {
  const{email , password}=req.body
        
  //check email  
  
  const checkEmail= await UserModel.findOne({email})

     if(!checkEmail){
         return res.json({message:"email not founed"})
     }

   const checkPassword=combare({planTEXT:password ,hashValue:checkEmail.password })

   if(!checkPassword){
     return res.json({message:"password not match"})
   }

   //generat token
  const accesToken= generateToken({payload:{id:checkEmail._id,isLogged:true,rule:checkEmail.role}
 ,signature:process.env.signature_token,expirend:60*60})
   checkEmail.status="online";
   await checkEmail.save();

 return res.json({message:"welcome",token:accesToken})


} catch (error) {
  return res.json({message:"catch error", error,stack:error.stack})
}

}