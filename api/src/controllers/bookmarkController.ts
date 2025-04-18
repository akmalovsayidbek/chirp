import prisma from "../config/prisma.js";
import { OK } from "../constants/http.js";
import catchErrors from "../utils/catchErrors.js";

export const getBookmarkInfoHandler = catchErrors(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      userId_postId: { userId, postId },
    },
  });

  const data = {
    did_I_bookmark: !!bookmark,
  };

  return res.status(OK).json(data);
});

export const bookmarkHandler = catchErrors(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  await prisma.bookmark.upsert({
    where: {
      userId_postId: { userId, postId },
    },
    create: { userId, postId },
    update: {},
  });

  return res.status(OK).json({ message: "Post bookmarked successfully" });
});

export const unbookmarkHandler = catchErrors(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  await prisma.bookmark.deleteMany({
    where: { userId, postId },
  });

  return res.status(OK).json({ message: "Post unbookmarked successfully" });
});
