
import connectionDB from "../DB/connection.js" ;

import  AuthRouter from "../SRC/modules/auth/auth.router.js"
import { messageRouter } from "./modules/messageModule/message.router.js";
import { userRouter } from "./modules/userModule/user.route.js";
import { GlobalErrorHandling } from "./modules/utils/errorHandling.js";
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname=path.dirname(fileURLToPath(import.meta.url))


const initApp=(app,express)=>{
    //convert baffer data
    app.use(express.json({}))

    app.use('/storageFiles',express.static(path.join(__dirname,'./modules/storageFiles')))
    app.use("/auth",AuthRouter)
    app.use("/user",userRouter)
    app.use('/message',messageRouter)
    app.use(GlobalErrorHandling)
   

    connectionDB()
}


export default initApp;