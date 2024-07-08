import dotenv from 'dotenv';
dotenv.config({ path: `${process.cwd()}/.env` });

import express from 'express';
import authRouter from './routes/authRoutes.js'; 
import orgRouter from './routes/orgRoutes.js'; 
import  catchAsync  from './util/catchAsync.js'; 
import  AppError  from './util/appError.js'; 
import globalErrorHandler from './controller/errorController.js'; 

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'You are welcome to the organization API',
  });
});


app.use("/auth", authRouter);
app.use('/api',orgRouter)

app.use(
  "*",
  catchAsync((req, res, next) => {
    throw new AppError("route not found", 404);
  })
);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
