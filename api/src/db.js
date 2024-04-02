import mongoose from "mongoose";

export const connectDB = async () => {
try {
    await mongoose.connect("mongodb://localhost/storetech1")
    console.log("BD CONECTADA")
} catch (error) {
    console.log(error)
}

}