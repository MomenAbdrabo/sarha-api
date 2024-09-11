
import multer from "multer"
import path from 'path'
import fs from "fs"
import { nanoid } from "nanoid"
import {fileURLToPath} from 'url'
///دي عشان اجيب الباص الي واقف فيه
const __dirname=path.dirname(fileURLToPath(import.meta.url))

export const FileValidation={
    image:["image/jpeg","image/png","image/gif",'image/jpg'],
    file:["application/pdf,application/msword"]
}

 export function uploudFile({customPath='general',validMimtype=[]}){
    const fullPath=path.join(__dirname,`../storageFiles/${customPath}`)
/// دي عشان اشوف هل الباس دا موجود ولا لا و لو مش موجود هيكؤتيه و يكريت ابوه
    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath,{recursive:true})
    }

    const storage=multer.diskStorage({
      
        destination:(res,file,cb)=>{
            cb(null,fullPath)//node not anderstand ../storageFiles
        },
        filename:(req,file,cb)=>{
            const fullName=nanoid()+file.originalname
            file.dest=`storageFiles/${customPath}/${fullName}`
            cb(null,fullName)
        }
    })

    function filterUploud(req,file,cb){
        if(validMimtype.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb("that file not match",false)
        }
    }

    const uploud=multer({storage})
        return uploud
    

}