import express from "express";
import { postDeploy } from "../controllers/DeployController.mjs";

const router = express.Router();

router.post('/', postDeploy);

export default router;