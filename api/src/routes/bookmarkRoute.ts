import { Router } from "express";
import {
  getBookmarkInfoHandler,
  bookmarkHandler,
  unbookmarkHandler,
} from "../controllers/bookmarkController.js";

const bookmarkRoutes = Router();

bookmarkRoutes.get("/:postId", getBookmarkInfoHandler);
bookmarkRoutes.post("/:postId", bookmarkHandler);
bookmarkRoutes.delete("/:postId", unbookmarkHandler);

export default bookmarkRoutes;
