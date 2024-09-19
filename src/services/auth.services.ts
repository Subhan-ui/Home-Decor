import { sendVerificationEmail } from "../lib/nodemail";
import { Context, SignUpArgs } from "../types/types";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { addHours } from "date-fns";
import { User } from "../../prisma/generated/type-graphql/models";
import jwt from "jsonwebtoken";
import { uploadingImage } from "../lib/cloudinary";

const createToken = (user: User) => {
  const secret = (process.env.APP_SECRET as string) || "";
  const { id, name, email, role } = user;
  return jwt.sign({ id, name, email, role }, secret, { expiresIn: "7d" });
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
      if (existingUser) {
        throw new Error("Email already in use");
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
  async login(
    { email, password }: { email: string; password: string },
    context: Context
  ) {
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
    return {
      token: createToken(user),
      user,
    };
  },
  async forgotPassword({ email }: { email: string }, context: Context) {
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
    { resetToken, newPassword }: { resetToken: string; newPassword: string },
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
    {
      name,
      mobileNumber,
      picture,
    }: { name: string; mobileNumber: string; picture: string },
    { prisma, me }: Context
  ) {
    if (!me) {
      return "You need to login";
    }
    try {
      const photo = await uploadingImage(picture);
      await prisma.user.update({
        where: { id: me.id },
        data: {
          name,
          profilePicture: photo.secure_url,
          mobileNumber,
        },
      });
      return `User updated Successfully, picture=>${photo.public_id}.${photo.format}`;
    } catch (error) {
      return error + "";
    }
  },
  async changeRole({ prisma, me }: Context) {
    if (!me) {
      return "You need to login";
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
