import prisma from "../config/prisma.js";
import { BAD_REQUEST, NOT_FOUND, OK } from "../constants/http.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";

export const getFollowInfoHandler = catchErrors(async (req, res) => {
  const followingId = req.params.followingId;
  const userId = req.userId;

  appAssert(userId !== followingId, BAD_REQUEST, "You can't follow yourself");

  const user = await prisma.user.findUnique({
    where: { id: followingId },
    select: {
      followers: {
        where: { followerId: userId },
        select: {
          followerId: true,
        },
      },
      _count: {
        select: {
          following: true,
          followers: true,
        },
      },
    },
  });
  appAssert(user, NOT_FOUND, "User not found");

  const data = {
    followers: user._count.followers,
    am_I_following: !!user.followers.length,
  };

  return res.status(OK).json(data);
});

export const followHandler = catchErrors(async (req, res) => {
  const followingId = req.params.followingId;
  const userId = req.userId;

  appAssert(followingId !== userId, BAD_REQUEST, "You can't follow yourself");

  await prisma.follow.upsert({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: followingId,
      },
    },
    create: {
      followerId: userId,
      followingId: followingId,
    },
    update: {},
  });

  return res.status(OK).json({ message: "Followed successfully" });
});

export const unfollowHandler = catchErrors(async (req, res) => {
  const followingId = req.params.followingId;
  const userId = req.userId;

  appAssert(followingId !== userId, BAD_REQUEST, "You can't follow yourself");

  await prisma.follow.deleteMany({
    where: {
      followerId: userId,
      followingId: followingId,
    },
  });

  return res.status(OK).json({ message: "Unfollowed successfully" });
});
