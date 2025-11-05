import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { queryLimiter } from "./config/rateLimit.config.js"
const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import queryRouter from './api/routes/get.route.js'
import visitRouter from './api/routes/visit.route.js'


//routes declaration
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.use("/api/v1/query", queryLimiter, queryRouter)
app.use("/api/v1/visit", visitRouter)


export { app }