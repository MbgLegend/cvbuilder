import mongoose from "mongoose"

let isConnected = false

const connectToDB = async () => {
    if (isConnected) {
        return
    }
    try {
        await mongoose.connect(process.env.MongoURI)
        isConnected = true
        console.log("✅ MongoDB connected successfully")
    } catch (error) {
        console.log(`❌ Could not connect MongoDB:`, error.message)
    }
}

export default connectToDB