
import multer from "multer"

export const FileValidation={
    image:["image/jpeg","image/png","image/gif",'image/jpg'],
    file:["application/pdf,application/msword"]
}

 export function uploudFile({validMimtype=[]}){
   
/// دي عشان اشوف هل الباس دا موجود ولا لا و لو مش موجود هيكؤتيه و يكريت ابوه
   
    const storage=multer.diskStorage({ })

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