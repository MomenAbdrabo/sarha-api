import express from 'express'
import * as dotenv from "dotenv"
import initApp from './SRC/app.router.js'


const app = express()
const port = process.env.PORT ||3000
dotenv.config()
initApp(app,express)


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))