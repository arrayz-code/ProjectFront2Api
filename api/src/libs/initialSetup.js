import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import User from "../models/user.model.js";
import { createInitialProducts } from "./initialProducts.js";
import { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD, TOKEN_SECRET } from "../config.js";

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
      console.log("Los roles ya existen.");
    }
  } catch (error) {
    console.error("Error al crear roles:", error);
  }
};

export const createAdmin = async () => {
  try {
    // Verificar si los roles ya existen
    const existingRoles = await Role.find();

    if (existingRoles.length === 0) {
      // Los roles no existen, crearlos
      await createRoles();
    }

    // Verificar si el usuario administrador ya existe
    const userFound = await User.findOne({ email: ADMIN_EMAIL });
    if (userFound) {
      console.log("El usuario administrador ya existe.");
      return;
    }

    // Buscar el rol "admin" en la base de datos
    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      console.error("El rol de administrador no se encontró en la base de datos.");
      return;
    }

    // Crear un nuevo usuario administrador
    const newUser = await User.create({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      roles: [adminRole._id], // Asignar el ID del rol al usuario
    });

    console.log(`Nuevo usuario administrador creado: ${newUser.email}`);

    const token = jwt.sign({ id: newUser._id }, TOKEN_SECRET);

    return token;
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
  }
};


createAdmin();
createInitialProducts();