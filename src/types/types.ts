import { PrismaClient } from "@prisma/client";
import { Field, ObjectType } from "type-graphql";
import { User } from "../../prisma/generated/type-graphql/models";

export type Context = {
  prisma: PrismaClient;
};

export type authType = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    mobileNumber: number;
    dateOfBirth: Date;
    password: string;
    address: string;
    isEmailVerified: boolean;
    createdAt: Date;
  };
};

@ObjectType()
export class AuthResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

export type SignUpArgs = {
  name: string;
  email: string;
  password: string;
  mobileNumber: number;
  dateOfBirth: Date;
  address: string;
};
