import { Router } from "express";
import {
  createPostHandler,
  deletePostHandler,
  getFollowingPostsHandler,
  getForYouPostsHandler,
} from "../controllers/postControllers.js";

const postRoutes = Router();

postRoutes.get("/for-you", getForYouPostsHandler);
postRoutes.get("/following", getFollowingPostsHandler);
postRoutes.post("/", createPostHandler);
postRoutes.delete("/:id", deletePostHandler);

export default postRoutes;
