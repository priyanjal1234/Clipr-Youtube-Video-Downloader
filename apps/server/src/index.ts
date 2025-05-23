import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

const app = express()

// Route Imports
import youtubeRouter from './routes/youtube.router'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/youtube",youtubeRouter)

const port = process.env.PORT || 4000
app.listen(port,function() {
    console.log(`Server is running on port ${port}`)
})