import User from "../models/user.model.js"
import Role from "../models/Role.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js"
import  jwt  from "jsonwebtoken";
import { TOKEN_SECRET,ADMIN_EMAIL, ADMIN_PASSWORD } from "../config.js";




export const register = async (req, res) => {
    const { email, password, username, roles } = req.body
    try {
        const rolesFound = await Role.find({ name: { $in: roles } });

        const userFound = await User.findOne({ email })
        if (userFound) return res.status(400).json(["Este Email ya existe"])
    
        

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            roles: rolesFound.map((role) => role._id),
        })

    
//verificacion de rol
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }
    
        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })



        res.cookie("token", token)

        res.json({

            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            roles: userSaved.roles,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
    
        res.status(500).json({ message: error.message })
        
    }
};




export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let userFound;

        // Verificar si es el usuario administrador por defecto
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            userFound = await User.findOne({ email: ADMIN_EMAIL });
        } else {
            // Proceso normal de autenticación para otros usuarios
            userFound = await User.findOne({ email }).populate("roles");
        }

        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Crear token para el usuario administrador por defecto
            const token = await createAccessToken({ id: userFound._id });
            res.cookie("token", token);
        } else {
            // Proceso normal de autenticación para otros usuarios
            const isMatch = await bcrypt.compare(password, userFound.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Contraseña Incorrecta" });
            }
            const token = await createAccessToken({ id: userFound._id });
            res.cookie("token", token);
        }
        const roles = userFound.roles.map(role => role.name);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            roles: userFound.roles,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





export const logout = (req, res) => {

    res.cookie("token", "", {
        expires: new Date(0),
    })
    return res.sendStatus(200)
}





export const profile = async (req, res) => {


    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "User no encontrado" })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updateAt,
    })


    res.send("profile")
}



export const verifyToken = async (req, res) => {

    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "No autorizado" })

        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({
            message: "No autorizado"
        })


        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })



    })


}