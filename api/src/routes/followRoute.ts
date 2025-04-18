import { Router } from "express";
import {
  followHandler,
  getFollowInfoHandler,
  unfollowHandler,
} from "../controllers/followController.js";

const followRoutes = Router();

followRoutes.get("/:followingId", getFollowInfoHandler);
followRoutes.post("/:followingId", followHandler);
followRoutes.delete("/:followingId", unfollowHandler);

export default followRoutes;
