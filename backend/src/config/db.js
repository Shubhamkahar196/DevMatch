import mongoose, { connection } from 'mongoose'

const connectDb = async() => {
    try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongodb connected Successfully Host db !! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error while connection to db",error)
        process.exit(1);
    }
}