import { PrismaClient } from "@prisma/client";
import { Field, ObjectType } from "type-graphql";

import { Stream } from "stream";
import { Categories } from "../../prisma/generated/type-graphql/enums/Categories";
import { Rating } from "../../prisma/generated/type-graphql/enums/Rating";
import {
  Category,
  FurnitureItem,
  SubCategory,
  User,
} from "../../prisma/generated/type-graphql/models";
import { OrderStatus } from "../../prisma/generated/type-graphql/enums/OrderStatus";

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

export type updateUser = {
  name: string;
  mobileNumber: string;
  picture: string;
  dateOfBirth: string;
};

export type loginType = { email: string; password: string };

export type emailType = { email: string };

export type resetPasswordType = { resetToken: string; newPassword: string };

export type cartItemType = { id: string; quantity: number };

export type idType = { id?: string; cartId?: string };

export type itemIdType = { itemId: string };

export type orderItemType = { productId: string; quantity: number };

export type productIdType = { productId: string };

export type reviewType = { productId: string; rating: Rating; comment: string };

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
    mobileNumber: string;
    dateOfBirth: Date;
    password: string;
    address: string;
    isEmailVerified: boolean;
    createdAt: Date;
  };
};

export type SignUpArgs = {
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  dateOfBirth: String;
};

export type addressType = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type itemType = {
  name: string;
  description: string;
  price: number;
  picture?: string;
  category: Categories;
  subCategory: string;
};

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  accessToken?: string;
  @Field({ nullable: true })
  refreshToken?: string;
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class FurnitureItemTypes {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => Number, { nullable: true })
  price?: number;
  @Field(() => String, { nullable: true })
  picture?: string;
  @Field(() => Category, { nullable: true })
  category?: Category;
  @Field(() => SubCategory, { nullable: true })
  subCategory?: SubCategory;
}

@ObjectType()
export class AddressResponse {
  @Field(() => String)
  street?: string;
  @Field(() => String)
  city?: string;
  @Field(() => String)
  state?: string;
  @Field(() => String)
  postalCode?: string;
  @Field(() => String)
  country?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class AuthResponses {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class ItemResponse {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => Number, { nullable: true })
  price?: number;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  picture?: string;
  @Field(() => Number, { nullable: true })
  createdAt?: number;
  @Field(() => Category, { nullable: true })
  category?: Category;
  @Field(() => SubCategory, { nullable: true })
  subCategory?: SubCategory;
  @Field(() => User, { nullable: true })
  user?: User;
}

export type googleUser = {
  email: string;
  name: string;
  picture: string;
};
@ObjectType()
export class SubCategoryType {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  id?: string;
}

@ObjectType()
export class CategoryType {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => [SubCategoryType], { nullable: true })
  subCategories?: SubCategoryType[];
}

@ObjectType()
export class CartItemType {
  @Field(() => String, { nullable: true })
  id?: String;
  @Field(() => Number, { nullable: true })
  quantity?: number;

  @Field(() => FurnitureItemTypes, { nullable: true })
  furnitureItem?: FurnitureItemTypes;

  @Field(() => Number)
  totalPrice(): number {
    const quantity = this.quantity ?? 0;
    const price = this.furnitureItem?.price ?? 0;
    return quantity * price;
  }
}

@ObjectType()
export class OrderItemType {
  @Field(() => Number, { nullable: true })
  quantity?: number;
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => Number, { nullable: true })
  price?: number;
  @Field(() => FurnitureItemTypes, { nullable: true })
  furnitureItem?: FurnitureItemTypes;
}

@ObjectType()
export class OrderType {
  @Field(() => [OrderItemType], { nullable: true })
  items?: OrderItemType[];
  @Field(() => Number)
  totalPrice?: number;
  @Field(() => String)
  id?: string;
  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class ReviewItemType {
  @Field(() => Rating, { nullable: true })
  rating?: Rating;
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => String, { nullable: true })
  comment?: string;
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => FurnitureItemTypes, { nullable: true })
  furnitureItem?: FurnitureItemTypes;
}

@ObjectType()
export class FavouriteType {
  @Field(() => String, { nullable: true })
  id?: String;
  @Field(() => FurnitureItemTypes, { nullable: true })
  furnitureItem?: FurnitureItemTypes;
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class Orders {
  @Field(() => Number, { nullable: true })
  totalPrice?: number;
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => OrderStatus, { nullable: true })
  status?: OrderStatus;
  @Field(() => [OrderItemType], { nullable: true })
  items?: OrderItemType[];
  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@ObjectType()
class Cart {
  @Field(() => Number, { nullable: true })
  quantity?: number;
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => FurnitureItemTypes, { nullable: true })
  furnitureItem?: FurnitureItemTypes;

  @Field(() => Number)
  totalPrice(): number {
    return (this.quantity ?? 0) * (this.furnitureItem?.price ?? 0);
  }
}

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  mobileNumber?: string;

  @Field(() => String, { nullable: true })
  dateOfBirth?: string;

  @Field(() => String, { nullable: true })
  role?: string;

  @Field(() => String, { nullable: true })
  profilePicture?: string;

  @Field(() => AddressResponse, { nullable: true })
  address?: AddressResponse;

  @Field(() => [FurnitureItemTypes], { nullable: true })
  furnitureItem?: FurnitureItemTypes[];

  @Field(() => [Orders], { nullable: true })
  orders?: Orders[];

  @Field(() => [Cart], { nullable: true })
  cartItems?: Cart[];

  @Field(() => [FavouriteType], { nullable: true })
  favourites?: FavouriteType[];

  @Field(() => [ReviewItemType], { nullable: true })
  reviews?: ReviewItemType[];
}
