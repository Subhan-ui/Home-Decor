import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AddressCreateNestedOneWithoutUserInput } from "../inputs/AddressCreateNestedOneWithoutUserInput";
import { CartItemCreateNestedManyWithoutUserInput } from "../inputs/CartItemCreateNestedManyWithoutUserInput";
import { FavouriteCreateNestedManyWithoutUserInput } from "../inputs/FavouriteCreateNestedManyWithoutUserInput";
import { FurnitureItemCreateNestedManyWithoutUserInput } from "../inputs/FurnitureItemCreateNestedManyWithoutUserInput";
import { OrderCreateNestedManyWithoutUserInput } from "../inputs/OrderCreateNestedManyWithoutUserInput";
import { ReviewCreateNestedManyWithoutUserInput } from "../inputs/ReviewCreateNestedManyWithoutUserInput";
import { Role } from "../../enums/Role";

@TypeGraphQL.InputType("UserCreateInput", {})
export class UserCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  mobileNumber!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  dateOfBirth!: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  password!: string;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  isEmailVerified?: boolean | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  verificationCode?: string | undefined;

  @TypeGraphQL.Field(_type => Role, {
    nullable: true
  })
  role?: "USER" | "ADMIN" | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  resetToken?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  resetTokenExpiry?: Date | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  profilePicture?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => AddressCreateNestedOneWithoutUserInput, {
    nullable: true
  })
  address?: AddressCreateNestedOneWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => FurnitureItemCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  furnitureItem?: FurnitureItemCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => OrderCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  orders?: OrderCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => CartItemCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  cartItems?: CartItemCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => FavouriteCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  favourites?: FavouriteCreateNestedManyWithoutUserInput | undefined;

  @TypeGraphQL.Field(_type => ReviewCreateNestedManyWithoutUserInput, {
    nullable: true
  })
  reviews?: ReviewCreateNestedManyWithoutUserInput | undefined;
}
