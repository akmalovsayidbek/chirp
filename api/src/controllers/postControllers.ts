import { CREATED, FORBIDDEN, NOT_FOUND, OK } from "../constants/http.js";
import catchErrors from "../utils/catchErrors.js";
import appAssert from "../utils/appAssert.js";
import prisma from "../config/prisma.js";
import { contentSchema } from "./schema.js";
import { pageSize } from "../constants/page.js";
import { postSelect } from "../config/select.js";

export const getForYouPostsHandler = catchErrors(async (req, res) => {
  const cursor = (req.query.cursor as string) || undefined;

  const posts = await prisma.post.findMany({
    skip: cursor ? 1 : 0,
    take: pageSize + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    select: postSelect(req.userId),
  });

  const nextCursor = posts.length > pageSize ? posts[pageSize - 1].id : null;

  const data = {
    posts: posts.slice(0, pageSize),
    nextCursor,
  };

  return res.status(OK).json(data);
});

export const getFollowingPostsHandler = catchErrors(async (req, res) => {
  const cursor = (req.query.cursor as string) || undefined;

  const posts = await prisma.post.findMany({
    skip: cursor ? 1 : 0,
    take: pageSize + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: [{ createdAt: "desc" }, { id: "asc" }],
    where: {
      user: {
        followers: {
          some: {
            followerId: req.userId,
          },
        },
      },
    },
    select: postSelect(req.userId),
  });

  const nextCursor = posts.length > pageSize ? posts[pageSize - 1].id : null;

  const data = {
    posts: posts.slice(0, pageSize),
    nextCursor,
  };

  return res.status(OK).json(data);
});

export const createPostHandler = catchErrors(async (req, res) => {
  const content = contentSchema.parse(req.body.content);

  const post = await prisma.post.create({
    data: {
      content,
      userId: req.userId,
    },
    select: postSelect(req.userId),
  });

  return res.status(CREATED).json(post);
});

export const deletePostHandler = catchErrors(async (req, res) => {
  const id = req.params.id;

  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  appAssert(post, NOT_FOUND, "Post not found");
  appAssert(
    post.userId === req.userId,
    FORBIDDEN,
    "You cannot delete this post"
  );

  await prisma.$transaction([
    prisma.like.deleteMany({ where: { postId: post.id } }),
    prisma.bookmark.deleteMany({ where: { postId: post.id } }),
    prisma.post.delete({ where: { id: post.id } }),
  ]);

  return res.status(OK).json(post);
});
