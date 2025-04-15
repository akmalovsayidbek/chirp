import { Router } from "express";
import { getUserHandler } from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.get("/:username", getUserHandler);

export default userRoutes;
