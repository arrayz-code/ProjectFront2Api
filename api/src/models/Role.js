
import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    versionKey: false // Esto evita la creación del campo "__v"
  }
);

export default mongoose.model("Role", roleSchema);
