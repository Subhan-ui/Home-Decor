import { PrismaClient } from "@prisma/client";
import { Field, ObjectType } from "type-graphql";
import { User } from "../../prisma/generated/type-graphql/models";
import { Stream } from "stream";

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
export type Context = {
  prisma: PrismaClient;
  me?: User;
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
  @Field({ nullable: true })
  token?: string;
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class AuthResponses {
  @Field(() => User, { nullable: true })
  user?: User;
}

export type SignUpArgs = {
  name: string;
  email: string;
  password: string;
  mobileNumber: number;
  dateOfBirth: String;
};
