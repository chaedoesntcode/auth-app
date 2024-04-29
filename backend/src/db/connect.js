import { config } from "dotenv";
import mongoose from "mongoose";

const connect = async () => {
    try {
        // console.log("Connecting to database...");
        // await mongoose.connect(process.env.MONGO_URI, {});
        // console.log("Connected Successfully.");

        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected')
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. ' + err);
            process.exit();
        })
    } catch (error) {
        console.log("Failed to connect to database: ", error);
        process.exit(1);
    }
};

export default connect;