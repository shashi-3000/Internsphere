
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import userRouter from "./routes/user.route.js";
import studentRouter from "./routes/student.route.js";
import industryRouter from "./routes/industry.route.js";
// import internshipRouter from "./routes/internship.route.js";
import matchRouter from "./routes/match.route.js"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
    next();
});



app.use("/api/v1/users", userRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/industry", industryRouter);
// app.use("/api/v1/internships", internshipRouter);
app.use("/api/v1/match", matchRouter); 



app.get('/api/v1/test', (req, res) => {
    res.status(200).json({ 
        message: 'InternSphere API is running!', 
        timestamp: new Date() 
    });
});


export default app ;
