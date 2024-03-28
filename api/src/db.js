import mongoose from "mongoose";

export const connectDB = async () => {
try {
    await mongoose.connect("mongodb://localhost/databasestore")
    console.log("BD CONECTADA")
} catch (error) {
    console.log(error)
}

}