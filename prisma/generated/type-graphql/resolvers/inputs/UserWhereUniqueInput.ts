import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AddressNullableRelationFilter } from "../inputs/AddressNullableRelationFilter";
import { BoolFilter } from "../inputs/BoolFilter";
import { CartItemListRelationFilter } from "../inputs/CartItemListRelationFilter";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { DateTimeNullableFilter } from "../inputs/DateTimeNullableFilter";
import { EnumRoleFilter } from "../inputs/EnumRoleFilter";
import { FavouriteListRelationFilter } from "../inputs/FavouriteListRelationFilter";
import { FurnitureItemListRelationFilter } from "../inputs/FurnitureItemListRelationFilter";
import { OrderListRelationFilter } from "../inputs/OrderListRelationFilter";
import { ReviewListRelationFilter } from "../inputs/ReviewListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { UserWhereInput } from "../inputs/UserWhereInput";

@TypeGraphQL.InputType("UserWhereUniqueInput", {})
export class UserWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  email?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  mobileNumber?: string | undefined;

  @TypeGraphQL.Field(_type => [UserWhereInput], {
    nullable: true
  })
  AND?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereInput], {
    nullable: true
  })
  OR?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [UserWhereInput], {
    nullable: true
  })
  NOT?: UserWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  dateOfBirth?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  password?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => BoolFilter, {
    nullable: true
  })
  isEmailVerified?: BoolFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  verificationCode?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => EnumRoleFilter, {
    nullable: true
  })
  role?: EnumRoleFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  resetToken?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeNullableFilter, {
    nullable: true
  })
  resetTokenExpiry?: DateTimeNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  profilePicture?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  refreshToken?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => AddressNullableRelationFilter, {
    nullable: true
  })
  address?: AddressNullableRelationFilter | undefined;

  @TypeGraphQL.Field(_type => FurnitureItemListRelationFilter, {
    nullable: true
  })
  furnitureItem?: FurnitureItemListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => OrderListRelationFilter, {
    nullable: true
  })
  orders?: OrderListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => CartItemListRelationFilter, {
    nullable: true
  })
  cartItems?: CartItemListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => FavouriteListRelationFilter, {
    nullable: true
  })
  favourites?: FavouriteListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ReviewListRelationFilter, {
    nullable: true
  })
  reviews?: ReviewListRelationFilter | undefined;
}
