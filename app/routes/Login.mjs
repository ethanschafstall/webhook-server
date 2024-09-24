import express from "express";
import { postLogin } from "../controllers/LoginController.mjs";

const router = express.Router();

router.post('/', postLogin);

export default router;