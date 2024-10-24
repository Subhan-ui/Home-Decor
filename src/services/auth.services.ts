import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { addHours } from "date-fns";
import jwt from "jsonwebtoken";

import { User } from "../../prisma/generated/type-graphql/models";
import { sendVerificationEmail } from "../lib/nodemail";
import {
  Context,
  emailType,
  loginType,
  resetPasswordType,
  SignUpArgs,
  updateUser,
} from "../types/types";
import { GraphQLError } from "graphql";

const isTokenExpiredSoon = (expiresAt: number, bufferTimeInMinutes: number) => {
  const now = Math.floor(Date.now() / 1000);
  return expiresAt - now < bufferTimeInMinutes * 60;
};
const createAccessToken = (user: User) => {
  const accessTokenSecret = process.env.APP_SECRET || "";
  const { id, name, email, role } = user;
  return jwt.sign({ id, name, email, role }, accessTokenSecret, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (user: User) => {
  const refreshTokenSecret = process.env.REFRESH_SECRET || "";
  const { id, name, email, role } = user;
  return jwt.sign({ id, name, email, role }, refreshTokenSecret, {
    expiresIn: "30d",
  });
};

export const auth = {
  async signUp(
    { password, dateOfBirth, email, name, mobileNumber }: SignUpArgs,
    context: Context
  ): Promise<{ user: User }> {
    try {
      const existingUser = await context.prisma.user.findUnique({
        where: { email },
      });
      const existUserMbl = await context.prisma.user.findUnique({
        where: { mobileNumber },
      });
      if (existingUser) {
        throw new Error("Email already in use");
      }
      if (existUserMbl) {
        throw new Error("Mobile Number already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const date = new Date(
        dateOfBirth as string | number | Date
      ).toISOString();
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      await sendVerificationEmail(email, verificationCode);
      const user = await context.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          mobileNumber,
          dateOfBirth: date,
          isEmailVerified: false,
          verificationCode,
        },
      });

      return { user };
    } catch (error) {
      throw error;
    }
  },
  async login({ email, password }: loginType, context: Context) {
    const user = await context.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return "User not found";
    }
    if (!user.isEmailVerified) {
      return "Email not verified";
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return "Invalid Password";
    }
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    const updateUser = await context.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: refreshToken,
      },
    });
    return {
      accessToken,
      refreshToken,
      user: updateUser,
    };
  },
  async refreshToken(
    { refreshToken }: { refreshToken: string },
    { prisma }: Context
  ) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET as string
      ) as { id: string; exp: number };

      const user = await prisma.user.findUnique({
        where: { id: payload?.id },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new GraphQLError("Invalid refresh token", {
          extensions: { code: "INVALID_TOKEN" },
        });
      }

      const refreshTokenExpiresSoon = isTokenExpiredSoon(payload.exp, 20);

      let newRefreshToken = refreshToken;
      const accessToken = createAccessToken(user);
      if (refreshTokenExpiresSoon) {
        let refresh = createRefreshToken(user);

        await prisma.user.update({
          where: { id: user.id },
          data: {
            refreshToken: refresh,
          },
        });
        return { accessToken, refreshToken: refresh, user };
      }
      return { accessToken, refreshToken: newRefreshToken, user };
    } catch (error) {
      throw new Error(error as string);
    }
  },
  async forgotPassword({ email }: emailType, context: Context) {
    const user = await context.prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      return "Email not registered.";
    }
    if (!user.isEmailVerified) {
      return "Email not verified.";
    }
    const resetToken = uuid();
    const resetTokenExpiry = addHours(new Date(), 1);
    await context.prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });
    await sendVerificationEmail(email, resetToken);
    return "Password Reset Email Send Successfully";
  },
  async resetPassword(
    { resetToken, newPassword }: resetPasswordType,
    context: Context
  ) {
    const user = await context.prisma.user.findFirst({
      where: {
        resetToken,
        resetTokenExpiry: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return "Invalid Or Expired Token";
    }
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return "You typed the same password again.";
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await context.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    return "Password Reset Successfully";
  },
  async updateUser(
    { name, mobileNumber, picture, dateOfBirth }: updateUser,
    { prisma, me }: Context
  ) {
    if (!me?.id) {
      throw new GraphQLError("User not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
    try {
      if (picture) {
        const photo = picture;
        await prisma.user.update({
          where: { id: me.id },
          data: {
            name,
            dateOfBirth,
            profilePicture: photo,
            mobileNumber,
          },
        });
        return `User updated Successfully`;
      }
      await prisma.user.update({
        where: { id: me.id },
        data: {
          name,
          dateOfBirth,
          mobileNumber,
        },
      });
      return `User updated Successfully`;
    } catch (error) {
      return error + "";
    }
  },
  async changeRole({ prisma, me }: Context) {
    if (!me?.id) {
      throw new GraphQLError("User not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
    if (me.role === "ADMIN") {
      return "You are already an admin";
    }
    await prisma.user.update({
      where: { id: me.id },
      data: {
        role: "ADMIN",
      },
    });
    return "You need to login again.";
  },
};
