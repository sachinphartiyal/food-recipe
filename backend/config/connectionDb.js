import mongoose from "mongoose"

const connectDb=async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log("connected..."))
}

export default connectDb