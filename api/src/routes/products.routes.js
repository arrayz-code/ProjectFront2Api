import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductById,
} from "../controllers/products.controller.js";


const router = Router();

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.post("/", createProduct);

router.put("/:productId", updateProductById);

router.delete("/:productId", deleteProductById);

export default router;
//TFCXEZT6A85VNLFGJMPP145G