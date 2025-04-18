import { Router } from "express";
import {
  getLikeInfoHandler,
  likeHandler,
  unlikeHandler,
} from "../controllers/likeController.js";

const likeRoutes = Router();

likeRoutes.get("/:postId", getLikeInfoHandler);
likeRoutes.post("/:postId", likeHandler);
likeRoutes.delete("/:postId", unlikeHandler);

export default likeRoutes;
