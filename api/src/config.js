import {config} from "dotenv"
config();

export const TOKEN_SECRET = "some secret key"


export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@admin.com";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
