import mongoose from "mongoose"
import 'dotenv/config'
const connectDB = async() => {
    try {
        mongoose.connection.on('connected', ()=>{
            console.log('Connection Successfull!')
        })
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB