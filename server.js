//SERVER.JS
import express from "express";
const app = express()


import authRouter from "./routes/authRoutes.js"

//env
import dotenv from 'dotenv'
dotenv.config()

//middleware
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";


app.use(express.json());


app.get('/', (req, res)=>{
    res.send('Welcome')
})


app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>console.log(`Server is listening @ ${port}`))
    } catch (error) {
        console.log(error)
    }

}

start()