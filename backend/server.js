import express from "express"
const app = express()
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/connectionDb.js"
import cors from "cors"

const PORT = process.env.PORT || 3000
connectDb()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

import userRoutes from "./routes/user.js"
import recipeRoutes from "./routes/recipe.js"
app.use("/", userRoutes)
app.use("/recipe", recipeRoutes)

// Only listen on port in local development, not in Vercel serverless
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, (err) => {
        console.log(`app is listening on port ${PORT}`)
    })
}

// Export the Express app for Vercel serverless functions
export default app