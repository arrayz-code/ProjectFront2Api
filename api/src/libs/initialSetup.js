import Role from "../models/Role.js";
import User from "../models/user.model.js";

import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } from "../config.js";

export const createRoles = async () => {
  try {
    // Verificar si los roles ya existen
    const existingRoles = await Role.find();

    if (existingRoles.length === 0) {
      // Los roles no existen, crearlos
      const values = await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "admin" }).save(),
      ]);

      console.log("Roles creados:", values);
    } else {

    }
  } catch (error) {
    console.error("Error al crear roles:", error);
  }
};



export const createAdmin = async () => {
  // check for an existing admin user
  const userFound = await User.findOne({ email: ADMIN_EMAIL });

  if (userFound) return;

  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin"] } });

  // create a new admin user
  const newUser = await User.create({

    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    roles: roles.map((role) => role._id),
  });

  console.log(`new user created: ${newUser.email}`);

  
};

createAdmin();
