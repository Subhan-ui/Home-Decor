import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { User } from "../../../prisma/generated/type-graphql/models";
import { AuthResponse, AuthResponses, Context } from "../../types/types";
import { Users } from "../User";
import { auth } from "../../services/auth.services";
import path from "path";
import cloudinary from "../../lib/cloudinary";

@Resolver()
export class AuthResolver {
  @Query(() => [User])
  async getUsers(@Ctx() ctx: Context, args: User) {
    return Users.getUsers(args, ctx);
  }
  @Query(() => User)
  async getUser(@Arg("email") email: string, @Ctx() ctx: Context) {
    return Users.getUser({ email }, ctx);
  }
  @Mutation(() => AuthResponses)
  async signUp(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("mobileNumber") mobileNumber: number,
    @Arg("dateOfBirth") dateOfBirth: String,
    @Ctx() ctx: Context
  ): Promise<AuthResponse | string> {
    try {
      return await auth.signUp(
        { name, email, password, mobileNumber, dateOfBirth },
        ctx
      );
    } catch (error) {
      console.error("Error in signUp resolver:", error);
      throw new Error("Signup failed");
    }
  }

  @Mutation(() => Boolean)
  async verifyEmail(
    @Arg("email") email: string,
    @Arg("verificationCode") verificationCode: string,
    @Ctx() ctx: Context
  ) {
    const user = await ctx.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user || user.verificationCode !== verificationCode) {
      throw new Error("Invalid Email or Verification Code");
    }
    await ctx.prisma.user.update({
      where: { email: email },
      data: {
        isEmailVerified: true,
        verificationCode: null,
      },
    });
    return true;
  }
  @Mutation(() => String)
  async DeleteUser(@Arg("email") email: string, @Ctx() ctx: Context) {
    const user = await ctx.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return "User Not Found";
    }
    await ctx.prisma.user.delete({ where: { email: email } });
    return "User Deleted Successfully";
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<AuthResponse | string> {
    return await auth.login({ email, password }, ctx);
  }
  @Mutation(() => String)
  async forgotPassword(@Arg("email") email: string, @Ctx() ctx: Context) {
    return await auth.forgotPassword({ email }, ctx);
  }

  @Mutation(() => String)
  async resetPassword(
    @Arg("resetToken") resetToken: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() ctx: Context
  ) {
    return await auth.resetPassword({ resetToken, newPassword }, ctx);
  }

  @Mutation(() => String)
  async uploadImage(
    @Arg("picture") picture: String,
    @Arg("email") email: string,
    @Ctx() { prisma }: Context
  ) {
    const mainDir = path.dirname(require.main?.filename || "");
    picture = `${mainDir}/uploads/${picture}`;
    try {
      const photo = await cloudinary.v2.uploader.upload(picture);
      console.log("image upload");
      await prisma.user.update({
        where: { email: email },
        data: {
          profilePicture: photo.secure_url,
        },
      });
      return `${photo.public_id}.${photo.format}`;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => String)
  async updateUser(
    @Arg("picture") picture: string,
    @Arg("email") email: string,
    @Arg("name") name: string,
    @Ctx() ctx: Context
  ) {
    return await auth.updateUser({ picture, email, name }, ctx);
  }
}
