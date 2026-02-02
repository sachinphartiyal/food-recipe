import dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path: "./.env",
})

import connectDb from "./config/connectionDb.js"

const PORT = process.env.PORT || 3000

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port : ${PORT}`);
        })
    })