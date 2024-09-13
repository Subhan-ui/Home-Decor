import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AddressOrderByWithRelationInput } from "../inputs/AddressOrderByWithRelationInput";
import { CartItemOrderByRelationAggregateInput } from "../inputs/CartItemOrderByRelationAggregateInput";
import { FavouriteOrderByRelationAggregateInput } from "../inputs/FavouriteOrderByRelationAggregateInput";
import { OrderOrderByRelationAggregateInput } from "../inputs/OrderOrderByRelationAggregateInput";
import { ReviewOrderByRelationAggregateInput } from "../inputs/ReviewOrderByRelationAggregateInput";
import { SortOrderInput } from "../inputs/SortOrderInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("UserOrderByWithRelationInput", {})
export class UserOrderByWithRelationInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  id?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  email?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  mobileNumber?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  dateOfBirth?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  password?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  isEmailVerified?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  verificationCode?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  resetToken?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  resetTokenExpiry?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrderInput, {
    nullable: true
  })
  profilePicture?: SortOrderInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => AddressOrderByWithRelationInput, {
    nullable: true
  })
  address?: AddressOrderByWithRelationInput | undefined;

  @TypeGraphQL.Field(_type => OrderOrderByRelationAggregateInput, {
    nullable: true
  })
  orders?: OrderOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => CartItemOrderByRelationAggregateInput, {
    nullable: true
  })
  cartItems?: CartItemOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => FavouriteOrderByRelationAggregateInput, {
    nullable: true
  })
  favourites?: FavouriteOrderByRelationAggregateInput | undefined;

  @TypeGraphQL.Field(_type => ReviewOrderByRelationAggregateInput, {
    nullable: true
  })
  reviews?: ReviewOrderByRelationAggregateInput | undefined;
}
