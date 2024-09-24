import express from "express";
import { postRegister } from "../controllers/RegisterController.mjs";

const router = express.Router();

router.post('/', postRegister);

export default router;