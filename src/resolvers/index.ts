import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { User } from "../../prisma/generated/type-graphql/models";
import { AuthResponse } from "../types/types";
import { Context } from "../types/types";
import { Users } from "./User";
import { auth } from "./Mutations/auth";

@Resolver()
export class AuthResolver {
  @Query(() => [User])
  async getUsers(@Ctx() ctx: Context, args: User) {
    return Users.getUsers(args, ctx);
  }
  @Mutation(() => AuthResponse)
  async signUp(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("mobileNumber") mobileNumber: number,
    @Arg("dateOfBirth") dateOfBirth: Date,
    @Arg("address") address: string,
    @Ctx() ctx: Context
  ): Promise<AuthResponse> {
    try {
      return await auth.signUp(
        { name, email, password, mobileNumber, dateOfBirth, address },
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
}
