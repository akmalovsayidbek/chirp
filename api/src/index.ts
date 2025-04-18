import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import authenticate from "./middleware/authenticate.js";
import profileRoutes from "./routes/profileRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import followRoutes from "./routes/followRoute.js";
import likeRoutes from "./routes/likeRoute.js";
import bookmarkRoutes from "./routes/bookmarkRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: APP_ORIGIN, credentials: true }));

app.use("/auth", authRoutes);
app.use("/profile", authenticate, profileRoutes);
app.use("/post", authenticate, postRoutes);
app.use("/follow", authenticate, followRoutes);
app.use("/like", authenticate, likeRoutes);
app.use("/bookmark", authenticate, bookmarkRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment`);
});
