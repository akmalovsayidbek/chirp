import prisma from "../config/prisma.js";
import { NOT_FOUND, OK } from "../constants/http.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";

export const getLikeInfoHandler = catchErrors(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      likes: {
        where: { userId },
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  appAssert(post, NOT_FOUND, "Post not found");

  const data = {
    likes: post._count.likes,
    did_I_like: !!post.likes.length,
  };

  return res.status(OK).json(data);
});

export const likeHandler = catchErrors(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  await prisma.like.upsert({
    where: {
      userId_postId: { userId, postId },
    },
    create: { userId, postId },
    update: {},
  });

  return res.status(OK).json({ message: "Post liked successfully" });
});

export const unlikeHandler = catchErrors(async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  await prisma.like.deleteMany({
    where: { userId, postId },
  });

  return res.status(OK).json({ message: "Post unliked successfully" });
});
