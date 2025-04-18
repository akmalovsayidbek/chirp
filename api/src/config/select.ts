export const userSelect = (userId: string) => ({
  id: true,
  name: true,
  username: true,
  avatar: true,
  bio: true,
  location: true,
  createdAt: true,
  followers: {
    where: {
      followerId: userId,
    },
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
});

export const postSelect = (userId: string) => ({
  id: true,
  content: true,
  createdAt: true,
  likes: {
    where: {
      userId,
    },
    select: {
      userId: true,
    },
  },
  bookmarks: {
    where: {
      userId,
    },
    select: {
      userId: true,
    },
  },
  _count: {
    select: {
      likes: true,
    },
  },
  user: {
    select: userSelect(userId),
  },
});
