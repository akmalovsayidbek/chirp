import prisma from "../config/prisma.js";
import { userSelect } from "../config/select.js";
import { OK, UNAUTHORIZED } from "../constants/http.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";

export const getProfileHandler = catchErrors(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: userSelect,
  });
  appAssert(user, UNAUTHORIZED, "User not found.");

  return res.status(OK).json(user);
});
