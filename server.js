import express from 'express'
const app=express();
import dotenv from 'dotenv'
dotenv.config();
import 'express-async-errors'

//db and authentication
import connectDB from './db/connect.js'

//routers
import authRouter from './routes/authRoutes.js'
import jobRouter from './routes/jobRoutes.js'

//middleware 
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';


//data coming from routes will be in json so to parse it,we have!
app.use(express.json())

app.get("/",(req,res)=>{
    //throw new Error('error');
    res.send('welcome');
})
app.get("/api/v1",(req,res)=>{
    //throw new Error('error');
    res.json({msg:'API'});
})
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',jobRouter);

app.use(notFoundMiddleware);//notFoundMiddleware will handle if request doesnt matches any of our route 
app.use(errorHandlerMiddleware);//handle all the error in the existing route 

// const port=process.env.PORT;
const port=process.env.PORT || 5000;

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()