import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/connectionDb.js"
import cors from "cors"

const PORT = process.env.PORT || 3000
connectDb()

// Parses incoming JSON requests
// Without this → req.body would be undefined
app.use(express.json())

// Allows frontend (React, Angular) to access backend
// Needed when frontend & backend are on different ports
app.use(cors())

// Makes public/ folder accessible via browser
app.use(express.static("public"))

import userRoutes from "./routes/user.js"
import recipeRoutes from "./routes/recipe.js"
app.use("/", userRoutes)
app.use("/recipe", recipeRoutes)

app.listen(PORT, (err) => {
    console.log(`app is listening on port ${PORT}`)
})

export default app