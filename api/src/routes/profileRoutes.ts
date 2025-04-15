import { Router } from "express";
import { getProfileHandler } from "../controllers/profileControllers.js";

const profileRoutes = Router();

profileRoutes.get("/", getProfileHandler);

export default profileRoutes;
