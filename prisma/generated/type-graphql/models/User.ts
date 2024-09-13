import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Address } from "../models/Address";
import { CartItem } from "../models/CartItem";
import { Favourite } from "../models/Favourite";
import { Order } from "../models/Order";
import { Review } from "../models/Review";
import { UserCount } from "../resolvers/outputs/UserCount";

@TypeGraphQL.ObjectType("User", {})
export class User {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  id!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => GraphQLScalars.BigIntResolver, {
    nullable: false
  })
  mobileNumber!: bigint;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  dateOfBirth!: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  password!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  isEmailVerified!: boolean;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  verificationCode?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  resetToken?: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  resetTokenExpiry?: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  profilePicture?: string | null;

  address?: Address | null;

  orders?: Order[];

  cartItems?: CartItem[];

  favourites?: Favourite[];

  reviews?: Review[];

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => UserCount, {
    nullable: true
  })
  _count?: UserCount | null;
}
