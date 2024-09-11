

import joi from "joi"

// arrow fn retrun req, res , next ليه 
// عشان معملهاش مخصص ل روت معين 
// ف و انا بحط الروت اخد الميسود الي هتتنفذ فيها الفلدجين

const arrofresev=['body','Headers','query']
export const valaidationMiddle=(Schema)=>{
const arrError=[]
return(req,res,next)=>{
    arrofresev.forEach(key => {

    if(Schema[key]){
        const validate=Schema[key].validate(req[key],{abortEarly:false})
        if(validate.error){
          //  return res.json({message:"valadater error",error:validate.error})
          arrError.push(validate)
        }
    }
    });
    if(arrError.length>0){
        return res.json({message:"valadater error",error:arrError})
    }
    next()
    } 






}

export const generalFaild={
    userName:joi.string().min(2).max(30).required(),
    email:joi.string()
    .email({minDomainSegments:2,maxDomainSegments:3,tlds:{allow:['com','edu']} }),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    CPassword:joi.ref('password')
}


