import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AddressUpdateOneWithoutUserNestedInput } from "../inputs/AddressUpdateOneWithoutUserNestedInput";
import { BoolFieldUpdateOperationsInput } from "../inputs/BoolFieldUpdateOperationsInput";
import { CartItemUpdateManyWithoutUserNestedInput } from "../inputs/CartItemUpdateManyWithoutUserNestedInput";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { EnumRoleFieldUpdateOperationsInput } from "../inputs/EnumRoleFieldUpdateOperationsInput";
import { FavouriteUpdateManyWithoutUserNestedInput } from "../inputs/FavouriteUpdateManyWithoutUserNestedInput";
import { FurnitureItemUpdateManyWithoutUserNestedInput } from "../inputs/FurnitureItemUpdateManyWithoutUserNestedInput";
import { NullableDateTimeFieldUpdateOperationsInput } from "../inputs/NullableDateTimeFieldUpdateOperationsInput";
import { NullableStringFieldUpdateOperationsInput } from "../inputs/NullableStringFieldUpdateOperationsInput";
import { OrderUpdateManyWithoutUserNestedInput } from "../inputs/OrderUpdateManyWithoutUserNestedInput";
import { ReviewUpdateManyWithoutUserNestedInput } from "../inputs/ReviewUpdateManyWithoutUserNestedInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType("UserUpdateInput", {})
export class UserUpdateInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  id?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  email?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  mobileNumber?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  dateOfBirth?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true
  })
  password?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => BoolFieldUpdateOperationsInput, {
    nullable: true
  })
  isEmailVerified?: BoolFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  verificationCode?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => EnumRoleFieldUpdateOperationsInput, {
    nullable: true
  })
  role?: EnumRoleFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  resetToken?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableDateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => NullableStringFieldUpdateOperationsInput, {
    nullable: true
  })
  profilePicture?: NullableStringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => AddressUpdateOneWithoutUserNestedInput, {
    nullable: true
  })
  address?: AddressUpdateOneWithoutUserNestedInput | undefined;

  @TypeGraphQL.Field(_type => FurnitureItemUpdateManyWithoutUserNestedInput, {
    nullable: true
  })
  furnitureItem?: FurnitureItemUpdateManyWithoutUserNestedInput | undefined;

  @TypeGraphQL.Field(_type => OrderUpdateManyWithoutUserNestedInput, {
    nullable: true
  })
  orders?: OrderUpdateManyWithoutUserNestedInput | undefined;

  @TypeGraphQL.Field(_type => CartItemUpdateManyWithoutUserNestedInput, {
    nullable: true
  })
  cartItems?: CartItemUpdateManyWithoutUserNestedInput | undefined;

  @TypeGraphQL.Field(_type => FavouriteUpdateManyWithoutUserNestedInput, {
    nullable: true
  })
  favourites?: FavouriteUpdateManyWithoutUserNestedInput | undefined;

  @TypeGraphQL.Field(_type => ReviewUpdateManyWithoutUserNestedInput, {
    nullable: true
  })
  reviews?: ReviewUpdateManyWithoutUserNestedInput | undefined;
}
