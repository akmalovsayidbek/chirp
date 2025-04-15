import { z } from "zod";
import prisma from "../config/prisma.js";
import { NOT_FOUND, OK } from "../constants/http.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";
import { userSelect } from "../config/select.js";

export const getUserHandler = catchErrors(async (req, res) => {
  const username = z.string().min(3).max(15).parse(req.params.username);

  const user = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
    select: userSelect,
  });
  appAssert(user, NOT_FOUND, "User not found");

  return res.status(OK).json(user);
});
