import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './routes/userRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import uploadRouter from './routes/uploadRoute.js';
import subCategoryRouter from './routes/subCategoryRoute.js';
import productRouter from './routes/productRouter.js';

dotenv.config();
const app = express();
app.use(cors({
    credentials : true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = process.env.PORT || 8080;

 app.get("/",(reques, response) => {
    // server to client
        response.json({message : "server is running" + PORT})
   } )

app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/file',uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`) 
    })  
})

