import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { Role } from "../../enums/Role";

@TypeGraphQL.ObjectType("UserMinAggregate", {})
export class UserMinAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  name!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  mobileNumber!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  dateOfBirth!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  password!: string | null;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isEmailVerified!: boolean | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  verificationCode!: string | null;

  @TypeGraphQL.Field(_type => Role, {
    nullable: true
  })
  role!: "USER" | "ADMIN" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  resetToken!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  resetTokenExpiry!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  profilePicture!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  refreshToken!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt!: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt!: Date | null;
}
