import { ClassType } from "type-graphql";
import * as tslib from "tslib";
import * as crudResolvers from "./resolvers/crud/resolvers-crud.index";
import * as argsTypes from "./resolvers/crud/args.index";
import * as actionResolvers from "./resolvers/crud/resolvers-actions.index";
import * as relationResolvers from "./resolvers/relations/resolvers.index";
import * as models from "./models";
import * as outputTypes from "./resolvers/outputs";
import * as inputTypes from "./resolvers/inputs";

export type MethodDecoratorOverrideFn = (decorators: MethodDecorator[]) => MethodDecorator[];

const crudResolversMap = {
  User: crudResolvers.UserCrudResolver,
  Address: crudResolvers.AddressCrudResolver,
  FurnitureItem: crudResolvers.FurnitureItemCrudResolver,
  Category: crudResolvers.CategoryCrudResolver,
  SubCategory: crudResolvers.SubCategoryCrudResolver,
  Order: crudResolvers.OrderCrudResolver,
  OrderItem: crudResolvers.OrderItemCrudResolver,
  CartItem: crudResolvers.CartItemCrudResolver,
  Favourite: crudResolvers.FavouriteCrudResolver,
  Review: crudResolvers.ReviewCrudResolver
};
const actionResolversMap = {
  User: {
    aggregateUser: actionResolvers.AggregateUserResolver,
    createManyUser: actionResolvers.CreateManyUserResolver,
    createManyAndReturnUser: actionResolvers.CreateManyAndReturnUserResolver,
    createOneUser: actionResolvers.CreateOneUserResolver,
    deleteManyUser: actionResolvers.DeleteManyUserResolver,
    deleteOneUser: actionResolvers.DeleteOneUserResolver,
    findFirstUser: actionResolvers.FindFirstUserResolver,
    findFirstUserOrThrow: actionResolvers.FindFirstUserOrThrowResolver,
    users: actionResolvers.FindManyUserResolver,
    user: actionResolvers.FindUniqueUserResolver,
    getUser: actionResolvers.FindUniqueUserOrThrowResolver,
    groupByUser: actionResolvers.GroupByUserResolver,
    updateManyUser: actionResolvers.UpdateManyUserResolver,
    updateOneUser: actionResolvers.UpdateOneUserResolver,
    upsertOneUser: actionResolvers.UpsertOneUserResolver
  },
  Address: {
    aggregateAddress: actionResolvers.AggregateAddressResolver,
    createManyAddress: actionResolvers.CreateManyAddressResolver,
    createManyAndReturnAddress: actionResolvers.CreateManyAndReturnAddressResolver,
    createOneAddress: actionResolvers.CreateOneAddressResolver,
    deleteManyAddress: actionResolvers.DeleteManyAddressResolver,
    deleteOneAddress: actionResolvers.DeleteOneAddressResolver,
    findFirstAddress: actionResolvers.FindFirstAddressResolver,
    findFirstAddressOrThrow: actionResolvers.FindFirstAddressOrThrowResolver,
    addresses: actionResolvers.FindManyAddressResolver,
    address: actionResolvers.FindUniqueAddressResolver,
    getAddress: actionResolvers.FindUniqueAddressOrThrowResolver,
    groupByAddress: actionResolvers.GroupByAddressResolver,
    updateManyAddress: actionResolvers.UpdateManyAddressResolver,
    updateOneAddress: actionResolvers.UpdateOneAddressResolver,
    upsertOneAddress: actionResolvers.UpsertOneAddressResolver
  },
  FurnitureItem: {
    aggregateFurnitureItem: actionResolvers.AggregateFurnitureItemResolver,
    createManyFurnitureItem: actionResolvers.CreateManyFurnitureItemResolver,
    createManyAndReturnFurnitureItem: actionResolvers.CreateManyAndReturnFurnitureItemResolver,
    createOneFurnitureItem: actionResolvers.CreateOneFurnitureItemResolver,
    deleteManyFurnitureItem: actionResolvers.DeleteManyFurnitureItemResolver,
    deleteOneFurnitureItem: actionResolvers.DeleteOneFurnitureItemResolver,
    findFirstFurnitureItem: actionResolvers.FindFirstFurnitureItemResolver,
    findFirstFurnitureItemOrThrow: actionResolvers.FindFirstFurnitureItemOrThrowResolver,
    furnitureItems: actionResolvers.FindManyFurnitureItemResolver,
    furnitureItem: actionResolvers.FindUniqueFurnitureItemResolver,
    getFurnitureItem: actionResolvers.FindUniqueFurnitureItemOrThrowResolver,
    groupByFurnitureItem: actionResolvers.GroupByFurnitureItemResolver,
    updateManyFurnitureItem: actionResolvers.UpdateManyFurnitureItemResolver,
    updateOneFurnitureItem: actionResolvers.UpdateOneFurnitureItemResolver,
    upsertOneFurnitureItem: actionResolvers.UpsertOneFurnitureItemResolver
  },
  Category: {
    aggregateCategory: actionResolvers.AggregateCategoryResolver,
    createManyCategory: actionResolvers.CreateManyCategoryResolver,
    createManyAndReturnCategory: actionResolvers.CreateManyAndReturnCategoryResolver,
    createOneCategory: actionResolvers.CreateOneCategoryResolver,
    deleteManyCategory: actionResolvers.DeleteManyCategoryResolver,
    deleteOneCategory: actionResolvers.DeleteOneCategoryResolver,
    findFirstCategory: actionResolvers.FindFirstCategoryResolver,
    findFirstCategoryOrThrow: actionResolvers.FindFirstCategoryOrThrowResolver,
    categories: actionResolvers.FindManyCategoryResolver,
    category: actionResolvers.FindUniqueCategoryResolver,
    getCategory: actionResolvers.FindUniqueCategoryOrThrowResolver,
    groupByCategory: actionResolvers.GroupByCategoryResolver,
    updateManyCategory: actionResolvers.UpdateManyCategoryResolver,
    updateOneCategory: actionResolvers.UpdateOneCategoryResolver,
    upsertOneCategory: actionResolvers.UpsertOneCategoryResolver
  },
  SubCategory: {
    aggregateSubCategory: actionResolvers.AggregateSubCategoryResolver,
    createManySubCategory: actionResolvers.CreateManySubCategoryResolver,
    createManyAndReturnSubCategory: actionResolvers.CreateManyAndReturnSubCategoryResolver,
    createOneSubCategory: actionResolvers.CreateOneSubCategoryResolver,
    deleteManySubCategory: actionResolvers.DeleteManySubCategoryResolver,
    deleteOneSubCategory: actionResolvers.DeleteOneSubCategoryResolver,
    findFirstSubCategory: actionResolvers.FindFirstSubCategoryResolver,
    findFirstSubCategoryOrThrow: actionResolvers.FindFirstSubCategoryOrThrowResolver,
    subCategories: actionResolvers.FindManySubCategoryResolver,
    subCategory: actionResolvers.FindUniqueSubCategoryResolver,
    getSubCategory: actionResolvers.FindUniqueSubCategoryOrThrowResolver,
    groupBySubCategory: actionResolvers.GroupBySubCategoryResolver,
    updateManySubCategory: actionResolvers.UpdateManySubCategoryResolver,
    updateOneSubCategory: actionResolvers.UpdateOneSubCategoryResolver,
    upsertOneSubCategory: actionResolvers.UpsertOneSubCategoryResolver
  },
  Order: {
    aggregateOrder: actionResolvers.AggregateOrderResolver,
    createManyOrder: actionResolvers.CreateManyOrderResolver,
    createManyAndReturnOrder: actionResolvers.CreateManyAndReturnOrderResolver,
    createOneOrder: actionResolvers.CreateOneOrderResolver,
    deleteManyOrder: actionResolvers.DeleteManyOrderResolver,
    deleteOneOrder: actionResolvers.DeleteOneOrderResolver,
    findFirstOrder: actionResolvers.FindFirstOrderResolver,
    findFirstOrderOrThrow: actionResolvers.FindFirstOrderOrThrowResolver,
    orders: actionResolvers.FindManyOrderResolver,
    order: actionResolvers.FindUniqueOrderResolver,
    getOrder: actionResolvers.FindUniqueOrderOrThrowResolver,
    groupByOrder: actionResolvers.GroupByOrderResolver,
    updateManyOrder: actionResolvers.UpdateManyOrderResolver,
    updateOneOrder: actionResolvers.UpdateOneOrderResolver,
    upsertOneOrder: actionResolvers.UpsertOneOrderResolver
  },
  OrderItem: {
    aggregateOrderItem: actionResolvers.AggregateOrderItemResolver,
    createManyOrderItem: actionResolvers.CreateManyOrderItemResolver,
    createManyAndReturnOrderItem: actionResolvers.CreateManyAndReturnOrderItemResolver,
    createOneOrderItem: actionResolvers.CreateOneOrderItemResolver,
    deleteManyOrderItem: actionResolvers.DeleteManyOrderItemResolver,
    deleteOneOrderItem: actionResolvers.DeleteOneOrderItemResolver,
    findFirstOrderItem: actionResolvers.FindFirstOrderItemResolver,
    findFirstOrderItemOrThrow: actionResolvers.FindFirstOrderItemOrThrowResolver,
    orderItems: actionResolvers.FindManyOrderItemResolver,
    orderItem: actionResolvers.FindUniqueOrderItemResolver,
    getOrderItem: actionResolvers.FindUniqueOrderItemOrThrowResolver,
    groupByOrderItem: actionResolvers.GroupByOrderItemResolver,
    updateManyOrderItem: actionResolvers.UpdateManyOrderItemResolver,
    updateOneOrderItem: actionResolvers.UpdateOneOrderItemResolver,
    upsertOneOrderItem: actionResolvers.UpsertOneOrderItemResolver
  },
  CartItem: {
    aggregateCartItem: actionResolvers.AggregateCartItemResolver,
    createManyCartItem: actionResolvers.CreateManyCartItemResolver,
    createManyAndReturnCartItem: actionResolvers.CreateManyAndReturnCartItemResolver,
    createOneCartItem: actionResolvers.CreateOneCartItemResolver,
    deleteManyCartItem: actionResolvers.DeleteManyCartItemResolver,
    deleteOneCartItem: actionResolvers.DeleteOneCartItemResolver,
    findFirstCartItem: actionResolvers.FindFirstCartItemResolver,
    findFirstCartItemOrThrow: actionResolvers.FindFirstCartItemOrThrowResolver,
    cartItems: actionResolvers.FindManyCartItemResolver,
    cartItem: actionResolvers.FindUniqueCartItemResolver,
    getCartItem: actionResolvers.FindUniqueCartItemOrThrowResolver,
    groupByCartItem: actionResolvers.GroupByCartItemResolver,
    updateManyCartItem: actionResolvers.UpdateManyCartItemResolver,
    updateOneCartItem: actionResolvers.UpdateOneCartItemResolver,
    upsertOneCartItem: actionResolvers.UpsertOneCartItemResolver
  },
  Favourite: {
    aggregateFavourite: actionResolvers.AggregateFavouriteResolver,
    createManyFavourite: actionResolvers.CreateManyFavouriteResolver,
    createManyAndReturnFavourite: actionResolvers.CreateManyAndReturnFavouriteResolver,
    createOneFavourite: actionResolvers.CreateOneFavouriteResolver,
    deleteManyFavourite: actionResolvers.DeleteManyFavouriteResolver,
    deleteOneFavourite: actionResolvers.DeleteOneFavouriteResolver,
    findFirstFavourite: actionResolvers.FindFirstFavouriteResolver,
    findFirstFavouriteOrThrow: actionResolvers.FindFirstFavouriteOrThrowResolver,
    favourites: actionResolvers.FindManyFavouriteResolver,
    favourite: actionResolvers.FindUniqueFavouriteResolver,
    getFavourite: actionResolvers.FindUniqueFavouriteOrThrowResolver,
    groupByFavourite: actionResolvers.GroupByFavouriteResolver,
    updateManyFavourite: actionResolvers.UpdateManyFavouriteResolver,
    updateOneFavourite: actionResolvers.UpdateOneFavouriteResolver,
    upsertOneFavourite: actionResolvers.UpsertOneFavouriteResolver
  },
  Review: {
    aggregateReview: actionResolvers.AggregateReviewResolver,
    createManyReview: actionResolvers.CreateManyReviewResolver,
    createManyAndReturnReview: actionResolvers.CreateManyAndReturnReviewResolver,
    createOneReview: actionResolvers.CreateOneReviewResolver,
    deleteManyReview: actionResolvers.DeleteManyReviewResolver,
    deleteOneReview: actionResolvers.DeleteOneReviewResolver,
    findFirstReview: actionResolvers.FindFirstReviewResolver,
    findFirstReviewOrThrow: actionResolvers.FindFirstReviewOrThrowResolver,
    reviews: actionResolvers.FindManyReviewResolver,
    review: actionResolvers.FindUniqueReviewResolver,
    getReview: actionResolvers.FindUniqueReviewOrThrowResolver,
    groupByReview: actionResolvers.GroupByReviewResolver,
    updateManyReview: actionResolvers.UpdateManyReviewResolver,
    updateOneReview: actionResolvers.UpdateOneReviewResolver,
    upsertOneReview: actionResolvers.UpsertOneReviewResolver
  }
};
const crudResolversInfo = {
  User: ["aggregateUser", "createManyUser", "createManyAndReturnUser", "createOneUser", "deleteManyUser", "deleteOneUser", "findFirstUser", "findFirstUserOrThrow", "users", "user", "getUser", "groupByUser", "updateManyUser", "updateOneUser", "upsertOneUser"],
  Address: ["aggregateAddress", "createManyAddress", "createManyAndReturnAddress", "createOneAddress", "deleteManyAddress", "deleteOneAddress", "findFirstAddress", "findFirstAddressOrThrow", "addresses", "address", "getAddress", "groupByAddress", "updateManyAddress", "updateOneAddress", "upsertOneAddress"],
  FurnitureItem: ["aggregateFurnitureItem", "createManyFurnitureItem", "createManyAndReturnFurnitureItem", "createOneFurnitureItem", "deleteManyFurnitureItem", "deleteOneFurnitureItem", "findFirstFurnitureItem", "findFirstFurnitureItemOrThrow", "furnitureItems", "furnitureItem", "getFurnitureItem", "groupByFurnitureItem", "updateManyFurnitureItem", "updateOneFurnitureItem", "upsertOneFurnitureItem"],
  Category: ["aggregateCategory", "createManyCategory", "createManyAndReturnCategory", "createOneCategory", "deleteManyCategory", "deleteOneCategory", "findFirstCategory", "findFirstCategoryOrThrow", "categories", "category", "getCategory", "groupByCategory", "updateManyCategory", "updateOneCategory", "upsertOneCategory"],
  SubCategory: ["aggregateSubCategory", "createManySubCategory", "createManyAndReturnSubCategory", "createOneSubCategory", "deleteManySubCategory", "deleteOneSubCategory", "findFirstSubCategory", "findFirstSubCategoryOrThrow", "subCategories", "subCategory", "getSubCategory", "groupBySubCategory", "updateManySubCategory", "updateOneSubCategory", "upsertOneSubCategory"],
  Order: ["aggregateOrder", "createManyOrder", "createManyAndReturnOrder", "createOneOrder", "deleteManyOrder", "deleteOneOrder", "findFirstOrder", "findFirstOrderOrThrow", "orders", "order", "getOrder", "groupByOrder", "updateManyOrder", "updateOneOrder", "upsertOneOrder"],
  OrderItem: ["aggregateOrderItem", "createManyOrderItem", "createManyAndReturnOrderItem", "createOneOrderItem", "deleteManyOrderItem", "deleteOneOrderItem", "findFirstOrderItem", "findFirstOrderItemOrThrow", "orderItems", "orderItem", "getOrderItem", "groupByOrderItem", "updateManyOrderItem", "updateOneOrderItem", "upsertOneOrderItem"],
  CartItem: ["aggregateCartItem", "createManyCartItem", "createManyAndReturnCartItem", "createOneCartItem", "deleteManyCartItem", "deleteOneCartItem", "findFirstCartItem", "findFirstCartItemOrThrow", "cartItems", "cartItem", "getCartItem", "groupByCartItem", "updateManyCartItem", "updateOneCartItem", "upsertOneCartItem"],
  Favourite: ["aggregateFavourite", "createManyFavourite", "createManyAndReturnFavourite", "createOneFavourite", "deleteManyFavourite", "deleteOneFavourite", "findFirstFavourite", "findFirstFavouriteOrThrow", "favourites", "favourite", "getFavourite", "groupByFavourite", "updateManyFavourite", "updateOneFavourite", "upsertOneFavourite"],
  Review: ["aggregateReview", "createManyReview", "createManyAndReturnReview", "createOneReview", "deleteManyReview", "deleteOneReview", "findFirstReview", "findFirstReviewOrThrow", "reviews", "review", "getReview", "groupByReview", "updateManyReview", "updateOneReview", "upsertOneReview"]
};
const argsInfo = {
  AggregateUserArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyUserArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnUserArgs: ["data", "skipDuplicates"],
  CreateOneUserArgs: ["data"],
  DeleteManyUserArgs: ["where"],
  DeleteOneUserArgs: ["where"],
  FindFirstUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstUserOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyUserArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueUserArgs: ["where"],
  FindUniqueUserOrThrowArgs: ["where"],
  GroupByUserArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyUserArgs: ["data", "where"],
  UpdateOneUserArgs: ["data", "where"],
  UpsertOneUserArgs: ["where", "create", "update"],
  AggregateAddressArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyAddressArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnAddressArgs: ["data", "skipDuplicates"],
  CreateOneAddressArgs: ["data"],
  DeleteManyAddressArgs: ["where"],
  DeleteOneAddressArgs: ["where"],
  FindFirstAddressArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstAddressOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyAddressArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueAddressArgs: ["where"],
  FindUniqueAddressOrThrowArgs: ["where"],
  GroupByAddressArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyAddressArgs: ["data", "where"],
  UpdateOneAddressArgs: ["data", "where"],
  UpsertOneAddressArgs: ["where", "create", "update"],
  AggregateFurnitureItemArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyFurnitureItemArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnFurnitureItemArgs: ["data", "skipDuplicates"],
  CreateOneFurnitureItemArgs: ["data"],
  DeleteManyFurnitureItemArgs: ["where"],
  DeleteOneFurnitureItemArgs: ["where"],
  FindFirstFurnitureItemArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstFurnitureItemOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyFurnitureItemArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueFurnitureItemArgs: ["where"],
  FindUniqueFurnitureItemOrThrowArgs: ["where"],
  GroupByFurnitureItemArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyFurnitureItemArgs: ["data", "where"],
  UpdateOneFurnitureItemArgs: ["data", "where"],
  UpsertOneFurnitureItemArgs: ["where", "create", "update"],
  AggregateCategoryArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyCategoryArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnCategoryArgs: ["data", "skipDuplicates"],
  CreateOneCategoryArgs: ["data"],
  DeleteManyCategoryArgs: ["where"],
  DeleteOneCategoryArgs: ["where"],
  FindFirstCategoryArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstCategoryOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyCategoryArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueCategoryArgs: ["where"],
  FindUniqueCategoryOrThrowArgs: ["where"],
  GroupByCategoryArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyCategoryArgs: ["data", "where"],
  UpdateOneCategoryArgs: ["data", "where"],
  UpsertOneCategoryArgs: ["where", "create", "update"],
  AggregateSubCategoryArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManySubCategoryArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnSubCategoryArgs: ["data", "skipDuplicates"],
  CreateOneSubCategoryArgs: ["data"],
  DeleteManySubCategoryArgs: ["where"],
  DeleteOneSubCategoryArgs: ["where"],
  FindFirstSubCategoryArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstSubCategoryOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManySubCategoryArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueSubCategoryArgs: ["where"],
  FindUniqueSubCategoryOrThrowArgs: ["where"],
  GroupBySubCategoryArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManySubCategoryArgs: ["data", "where"],
  UpdateOneSubCategoryArgs: ["data", "where"],
  UpsertOneSubCategoryArgs: ["where", "create", "update"],
  AggregateOrderArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyOrderArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnOrderArgs: ["data", "skipDuplicates"],
  CreateOneOrderArgs: ["data"],
  DeleteManyOrderArgs: ["where"],
  DeleteOneOrderArgs: ["where"],
  FindFirstOrderArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstOrderOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyOrderArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueOrderArgs: ["where"],
  FindUniqueOrderOrThrowArgs: ["where"],
  GroupByOrderArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyOrderArgs: ["data", "where"],
  UpdateOneOrderArgs: ["data", "where"],
  UpsertOneOrderArgs: ["where", "create", "update"],
  AggregateOrderItemArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyOrderItemArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnOrderItemArgs: ["data", "skipDuplicates"],
  CreateOneOrderItemArgs: ["data"],
  DeleteManyOrderItemArgs: ["where"],
  DeleteOneOrderItemArgs: ["where"],
  FindFirstOrderItemArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstOrderItemOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyOrderItemArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueOrderItemArgs: ["where"],
  FindUniqueOrderItemOrThrowArgs: ["where"],
  GroupByOrderItemArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyOrderItemArgs: ["data", "where"],
  UpdateOneOrderItemArgs: ["data", "where"],
  UpsertOneOrderItemArgs: ["where", "create", "update"],
  AggregateCartItemArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyCartItemArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnCartItemArgs: ["data", "skipDuplicates"],
  CreateOneCartItemArgs: ["data"],
  DeleteManyCartItemArgs: ["where"],
  DeleteOneCartItemArgs: ["where"],
  FindFirstCartItemArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstCartItemOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyCartItemArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueCartItemArgs: ["where"],
  FindUniqueCartItemOrThrowArgs: ["where"],
  GroupByCartItemArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyCartItemArgs: ["data", "where"],
  UpdateOneCartItemArgs: ["data", "where"],
  UpsertOneCartItemArgs: ["where", "create", "update"],
  AggregateFavouriteArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyFavouriteArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnFavouriteArgs: ["data", "skipDuplicates"],
  CreateOneFavouriteArgs: ["data"],
  DeleteManyFavouriteArgs: ["where"],
  DeleteOneFavouriteArgs: ["where"],
  FindFirstFavouriteArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstFavouriteOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyFavouriteArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueFavouriteArgs: ["where"],
  FindUniqueFavouriteOrThrowArgs: ["where"],
  GroupByFavouriteArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyFavouriteArgs: ["data", "where"],
  UpdateOneFavouriteArgs: ["data", "where"],
  UpsertOneFavouriteArgs: ["where", "create", "update"],
  AggregateReviewArgs: ["where", "orderBy", "cursor", "take", "skip"],
  CreateManyReviewArgs: ["data", "skipDuplicates"],
  CreateManyAndReturnReviewArgs: ["data", "skipDuplicates"],
  CreateOneReviewArgs: ["data"],
  DeleteManyReviewArgs: ["where"],
  DeleteOneReviewArgs: ["where"],
  FindFirstReviewArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindFirstReviewOrThrowArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindManyReviewArgs: ["where", "orderBy", "cursor", "take", "skip", "distinct"],
  FindUniqueReviewArgs: ["where"],
  FindUniqueReviewOrThrowArgs: ["where"],
  GroupByReviewArgs: ["where", "orderBy", "by", "having", "take", "skip"],
  UpdateManyReviewArgs: ["data", "where"],
  UpdateOneReviewArgs: ["data", "where"],
  UpsertOneReviewArgs: ["where", "create", "update"]
};

type ResolverModelNames = keyof typeof crudResolversMap;

type ModelResolverActionNames<
  TModel extends ResolverModelNames
> = keyof typeof crudResolversMap[TModel]["prototype"];

export type ResolverActionsConfig<
  TModel extends ResolverModelNames
> = Partial<Record<ModelResolverActionNames<TModel>, MethodDecorator[] | MethodDecoratorOverrideFn>>
  & {
    _all?: MethodDecorator[];
    _query?: MethodDecorator[];
    _mutation?: MethodDecorator[];
  };

export type ResolversEnhanceMap = {
  [TModel in ResolverModelNames]?: ResolverActionsConfig<TModel>;
};

export function applyResolversEnhanceMap(
  resolversEnhanceMap: ResolversEnhanceMap,
) {
  const mutationOperationPrefixes = [
    "createOne", "createMany", "createManyAndReturn", "deleteOne", "updateOne", "deleteMany", "updateMany", "upsertOne"
  ];
  for (const resolversEnhanceMapKey of Object.keys(resolversEnhanceMap)) {
    const modelName = resolversEnhanceMapKey as keyof typeof resolversEnhanceMap;
    const crudTarget = crudResolversMap[modelName].prototype;
    const resolverActionsConfig = resolversEnhanceMap[modelName]!;
    const actionResolversConfig = actionResolversMap[modelName];
    const allActionsDecorators = resolverActionsConfig._all;
    const resolverActionNames = crudResolversInfo[modelName as keyof typeof crudResolversInfo];
    for (const resolverActionName of resolverActionNames) {
      const maybeDecoratorsOrFn = resolverActionsConfig[
        resolverActionName as keyof typeof resolverActionsConfig
      ] as MethodDecorator[] | MethodDecoratorOverrideFn | undefined;
      const isWriteOperation = mutationOperationPrefixes.some(prefix => resolverActionName.startsWith(prefix));
      const operationKindDecorators = isWriteOperation ? resolverActionsConfig._mutation : resolverActionsConfig._query;
      const mainDecorators = [
        ...allActionsDecorators ?? [],
        ...operationKindDecorators ?? [],
      ]
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(mainDecorators);
      } else {
        decorators = [...mainDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      const actionTarget = (actionResolversConfig[
        resolverActionName as keyof typeof actionResolversConfig
      ] as Function).prototype;
      tslib.__decorate(decorators, crudTarget, resolverActionName, null);
      tslib.__decorate(decorators, actionTarget, resolverActionName, null);
    }
  }
}

type ArgsTypesNames = keyof typeof argsTypes;

type ArgFieldNames<TArgsType extends ArgsTypesNames> = Exclude<
  keyof typeof argsTypes[TArgsType]["prototype"],
  number | symbol
>;

type ArgFieldsConfig<
  TArgsType extends ArgsTypesNames
> = FieldsConfig<ArgFieldNames<TArgsType>>;

export type ArgConfig<TArgsType extends ArgsTypesNames> = {
  class?: ClassDecorator[];
  fields?: ArgFieldsConfig<TArgsType>;
};

export type ArgsTypesEnhanceMap = {
  [TArgsType in ArgsTypesNames]?: ArgConfig<TArgsType>;
};

export function applyArgsTypesEnhanceMap(
  argsTypesEnhanceMap: ArgsTypesEnhanceMap,
) {
  for (const argsTypesEnhanceMapKey of Object.keys(argsTypesEnhanceMap)) {
    const argsTypeName = argsTypesEnhanceMapKey as keyof typeof argsTypesEnhanceMap;
    const typeConfig = argsTypesEnhanceMap[argsTypeName]!;
    const typeClass = argsTypes[argsTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      argsInfo[argsTypeName as keyof typeof argsInfo],
    );
  }
}

const relationResolversMap = {
  User: relationResolvers.UserRelationsResolver,
  Address: relationResolvers.AddressRelationsResolver,
  FurnitureItem: relationResolvers.FurnitureItemRelationsResolver,
  Category: relationResolvers.CategoryRelationsResolver,
  SubCategory: relationResolvers.SubCategoryRelationsResolver,
  Order: relationResolvers.OrderRelationsResolver,
  OrderItem: relationResolvers.OrderItemRelationsResolver,
  CartItem: relationResolvers.CartItemRelationsResolver,
  Favourite: relationResolvers.FavouriteRelationsResolver,
  Review: relationResolvers.ReviewRelationsResolver
};
const relationResolversInfo = {
  User: ["address", "orders", "cartItems", "favourites", "reviews"],
  Address: ["user"],
  FurnitureItem: ["category", "subCategory", "reviews", "favourites", "cartItems", "furnitureItem"],
  Category: ["subCategories", "furnitureItems"],
  SubCategory: ["category", "furnitureItems"],
  Order: ["user", "items"],
  OrderItem: ["order", "furnitureItem"],
  CartItem: ["user", "furnitureItem"],
  Favourite: ["user", "furnitureItem"],
  Review: ["user", "furnitureItem"]
};

type RelationResolverModelNames = keyof typeof relationResolversMap;

type RelationResolverActionNames<
  TModel extends RelationResolverModelNames
> = keyof typeof relationResolversMap[TModel]["prototype"];

export type RelationResolverActionsConfig<TModel extends RelationResolverModelNames>
  = Partial<Record<RelationResolverActionNames<TModel>, MethodDecorator[] | MethodDecoratorOverrideFn>>
  & { _all?: MethodDecorator[] };

export type RelationResolversEnhanceMap = {
  [TModel in RelationResolverModelNames]?: RelationResolverActionsConfig<TModel>;
};

export function applyRelationResolversEnhanceMap(
  relationResolversEnhanceMap: RelationResolversEnhanceMap,
) {
  for (const relationResolversEnhanceMapKey of Object.keys(relationResolversEnhanceMap)) {
    const modelName = relationResolversEnhanceMapKey as keyof typeof relationResolversEnhanceMap;
    const relationResolverTarget = relationResolversMap[modelName].prototype;
    const relationResolverActionsConfig = relationResolversEnhanceMap[modelName]!;
    const allActionsDecorators = relationResolverActionsConfig._all ?? [];
    const relationResolverActionNames = relationResolversInfo[modelName as keyof typeof relationResolversInfo];
    for (const relationResolverActionName of relationResolverActionNames) {
      const maybeDecoratorsOrFn = relationResolverActionsConfig[
        relationResolverActionName as keyof typeof relationResolverActionsConfig
      ] as MethodDecorator[] | MethodDecoratorOverrideFn | undefined;
      let decorators: MethodDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(allActionsDecorators);
      } else {
        decorators = [...allActionsDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      tslib.__decorate(decorators, relationResolverTarget, relationResolverActionName, null);
    }
  }
}

type TypeConfig = {
  class?: ClassDecorator[];
  fields?: FieldsConfig;
};

export type PropertyDecoratorOverrideFn = (decorators: PropertyDecorator[]) => PropertyDecorator[];

type FieldsConfig<TTypeKeys extends string = string> = Partial<
  Record<TTypeKeys, PropertyDecorator[] | PropertyDecoratorOverrideFn>
> & { _all?: PropertyDecorator[] };

function applyTypeClassEnhanceConfig<
  TEnhanceConfig extends TypeConfig,
  TType extends object
>(
  enhanceConfig: TEnhanceConfig,
  typeClass: ClassType<TType>,
  typePrototype: TType,
  typeFieldNames: string[]
) {
  if (enhanceConfig.class) {
    tslib.__decorate(enhanceConfig.class, typeClass);
  }
  if (enhanceConfig.fields) {
    const allFieldsDecorators = enhanceConfig.fields._all ?? [];
    for (const typeFieldName of typeFieldNames) {
      const maybeDecoratorsOrFn = enhanceConfig.fields[
        typeFieldName
      ] as PropertyDecorator[] | PropertyDecoratorOverrideFn | undefined;
      let decorators: PropertyDecorator[];
      if (typeof maybeDecoratorsOrFn === "function") {
        decorators = maybeDecoratorsOrFn(allFieldsDecorators);
      } else {
        decorators = [...allFieldsDecorators, ...maybeDecoratorsOrFn ?? []];
      }
      tslib.__decorate(decorators, typePrototype, typeFieldName, void 0);
    }
  }
}

const modelsInfo = {
  User: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  Address: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt"],
  FurnitureItem: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt"],
  Category: ["id", "name"],
  SubCategory: ["id", "name", "categoryId"],
  Order: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt"],
  OrderItem: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt"],
  CartItem: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  Favourite: ["id", "userId", "furnitureItemId", "createdAt"],
  Review: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"]
};

type ModelNames = keyof typeof models;

type ModelFieldNames<TModel extends ModelNames> = Exclude<
  keyof typeof models[TModel]["prototype"],
  number | symbol
>;

type ModelFieldsConfig<TModel extends ModelNames> = FieldsConfig<
  ModelFieldNames<TModel>
>;

export type ModelConfig<TModel extends ModelNames> = {
  class?: ClassDecorator[];
  fields?: ModelFieldsConfig<TModel>;
};

export type ModelsEnhanceMap = {
  [TModel in ModelNames]?: ModelConfig<TModel>;
};

export function applyModelsEnhanceMap(modelsEnhanceMap: ModelsEnhanceMap) {
  for (const modelsEnhanceMapKey of Object.keys(modelsEnhanceMap)) {
    const modelName = modelsEnhanceMapKey as keyof typeof modelsEnhanceMap;
    const modelConfig = modelsEnhanceMap[modelName]!;
    const modelClass = models[modelName];
    const modelTarget = modelClass.prototype;
    applyTypeClassEnhanceConfig(
      modelConfig,
      modelClass,
      modelTarget,
      modelsInfo[modelName as keyof typeof modelsInfo],
    );
  }
}

const outputsInfo = {
  AggregateUser: ["_count", "_avg", "_sum", "_min", "_max"],
  UserGroupBy: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateAddress: ["_count", "_min", "_max"],
  AddressGroupBy: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt", "_count", "_min", "_max"],
  AggregateFurnitureItem: ["_count", "_avg", "_sum", "_min", "_max"],
  FurnitureItemGroupBy: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateCategory: ["_count", "_min", "_max"],
  CategoryGroupBy: ["id", "name", "_count", "_min", "_max"],
  AggregateSubCategory: ["_count", "_min", "_max"],
  SubCategoryGroupBy: ["id", "name", "categoryId", "_count", "_min", "_max"],
  AggregateOrder: ["_count", "_avg", "_sum", "_min", "_max"],
  OrderGroupBy: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateOrderItem: ["_count", "_avg", "_sum", "_min", "_max"],
  OrderItemGroupBy: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateCartItem: ["_count", "_avg", "_sum", "_min", "_max"],
  CartItemGroupBy: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt", "_count", "_avg", "_sum", "_min", "_max"],
  AggregateFavourite: ["_count", "_min", "_max"],
  FavouriteGroupBy: ["id", "userId", "furnitureItemId", "createdAt", "_count", "_min", "_max"],
  AggregateReview: ["_count", "_avg", "_sum", "_min", "_max"],
  ReviewGroupBy: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt", "_count", "_avg", "_sum", "_min", "_max"],
  AffectedRowsOutput: ["count"],
  UserCount: ["orders", "cartItems", "favourites", "reviews"],
  UserCountAggregate: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "_all"],
  UserAvgAggregate: ["mobileNumber"],
  UserSumAggregate: ["mobileNumber"],
  UserMinAggregate: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  UserMaxAggregate: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  AddressCountAggregate: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt", "_all"],
  AddressMinAggregate: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt"],
  AddressMaxAggregate: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt"],
  FurnitureItemCount: ["reviews", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemCountAggregate: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt", "_all"],
  FurnitureItemAvgAggregate: ["price"],
  FurnitureItemSumAggregate: ["price"],
  FurnitureItemMinAggregate: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt"],
  FurnitureItemMaxAggregate: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt"],
  CategoryCount: ["subCategories", "furnitureItems"],
  CategoryCountAggregate: ["id", "name", "_all"],
  CategoryMinAggregate: ["id", "name"],
  CategoryMaxAggregate: ["id", "name"],
  SubCategoryCount: ["furnitureItems"],
  SubCategoryCountAggregate: ["id", "name", "categoryId", "_all"],
  SubCategoryMinAggregate: ["id", "name", "categoryId"],
  SubCategoryMaxAggregate: ["id", "name", "categoryId"],
  OrderCount: ["items"],
  OrderCountAggregate: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt", "_all"],
  OrderAvgAggregate: ["totalPrice"],
  OrderSumAggregate: ["totalPrice"],
  OrderMinAggregate: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt"],
  OrderMaxAggregate: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt"],
  OrderItemCountAggregate: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt", "_all"],
  OrderItemAvgAggregate: ["quantity", "price"],
  OrderItemSumAggregate: ["quantity", "price"],
  OrderItemMinAggregate: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt"],
  OrderItemMaxAggregate: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt"],
  CartItemCountAggregate: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt", "_all"],
  CartItemAvgAggregate: ["quantity"],
  CartItemSumAggregate: ["quantity"],
  CartItemMinAggregate: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  CartItemMaxAggregate: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  FavouriteCountAggregate: ["id", "userId", "furnitureItemId", "createdAt", "_all"],
  FavouriteMinAggregate: ["id", "userId", "furnitureItemId", "createdAt"],
  FavouriteMaxAggregate: ["id", "userId", "furnitureItemId", "createdAt"],
  ReviewCountAggregate: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt", "_all"],
  ReviewAvgAggregate: ["rating"],
  ReviewSumAggregate: ["rating"],
  ReviewMinAggregate: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"],
  ReviewMaxAggregate: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"],
  CreateManyAndReturnUser: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  CreateManyAndReturnAddress: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt", "user"],
  CreateManyAndReturnFurnitureItem: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt", "category", "subCategory"],
  CreateManyAndReturnCategory: ["id", "name"],
  CreateManyAndReturnSubCategory: ["id", "name", "categoryId", "category"],
  CreateManyAndReturnOrder: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt", "user"],
  CreateManyAndReturnOrderItem: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt", "order", "furnitureItem"],
  CreateManyAndReturnCartItem: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt", "user", "furnitureItem"],
  CreateManyAndReturnFavourite: ["id", "userId", "furnitureItemId", "createdAt", "user", "furnitureItem"],
  CreateManyAndReturnReview: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt", "user", "furnitureItem"]
};

type OutputTypesNames = keyof typeof outputTypes;

type OutputTypeFieldNames<TOutput extends OutputTypesNames> = Exclude<
  keyof typeof outputTypes[TOutput]["prototype"],
  number | symbol
>;

type OutputTypeFieldsConfig<
  TOutput extends OutputTypesNames
> = FieldsConfig<OutputTypeFieldNames<TOutput>>;

export type OutputTypeConfig<TOutput extends OutputTypesNames> = {
  class?: ClassDecorator[];
  fields?: OutputTypeFieldsConfig<TOutput>;
};

export type OutputTypesEnhanceMap = {
  [TOutput in OutputTypesNames]?: OutputTypeConfig<TOutput>;
};

export function applyOutputTypesEnhanceMap(
  outputTypesEnhanceMap: OutputTypesEnhanceMap,
) {
  for (const outputTypeEnhanceMapKey of Object.keys(outputTypesEnhanceMap)) {
    const outputTypeName = outputTypeEnhanceMapKey as keyof typeof outputTypesEnhanceMap;
    const typeConfig = outputTypesEnhanceMap[outputTypeName]!;
    const typeClass = outputTypes[outputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      outputsInfo[outputTypeName as keyof typeof outputsInfo],
    );
  }
}

const inputsInfo = {
  UserWhereInput: ["AND", "OR", "NOT", "id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "cartItems", "favourites", "reviews"],
  UserOrderByWithRelationInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "cartItems", "favourites", "reviews"],
  UserWhereUniqueInput: ["id", "email", "mobileNumber", "AND", "OR", "NOT", "name", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "cartItems", "favourites", "reviews"],
  UserOrderByWithAggregationInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "_count", "_avg", "_max", "_min", "_sum"],
  UserScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  AddressWhereInput: ["AND", "OR", "NOT", "id", "userId", "street", "city", "state", "postalCode", "country", "createdAt", "user"],
  AddressOrderByWithRelationInput: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt", "user"],
  AddressWhereUniqueInput: ["id", "userId", "AND", "OR", "NOT", "street", "city", "state", "postalCode", "country", "createdAt", "user"],
  AddressOrderByWithAggregationInput: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt", "_count", "_max", "_min"],
  AddressScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "userId", "street", "city", "state", "postalCode", "country", "createdAt"],
  FurnitureItemWhereInput: ["AND", "OR", "NOT", "id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt", "category", "subCategory", "reviews", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemOrderByWithRelationInput: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt", "category", "subCategory", "reviews", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemWhereUniqueInput: ["id", "AND", "OR", "NOT", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt", "category", "subCategory", "reviews", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemOrderByWithAggregationInput: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt", "_count", "_avg", "_max", "_min", "_sum"],
  FurnitureItemScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt"],
  CategoryWhereInput: ["AND", "OR", "NOT", "id", "name", "subCategories", "furnitureItems"],
  CategoryOrderByWithRelationInput: ["id", "name", "subCategories", "furnitureItems"],
  CategoryWhereUniqueInput: ["id", "AND", "OR", "NOT", "name", "subCategories", "furnitureItems"],
  CategoryOrderByWithAggregationInput: ["id", "name", "_count", "_max", "_min"],
  CategoryScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name"],
  SubCategoryWhereInput: ["AND", "OR", "NOT", "id", "name", "categoryId", "category", "furnitureItems"],
  SubCategoryOrderByWithRelationInput: ["id", "name", "categoryId", "category", "furnitureItems"],
  SubCategoryWhereUniqueInput: ["id", "AND", "OR", "NOT", "name", "categoryId", "category", "furnitureItems"],
  SubCategoryOrderByWithAggregationInput: ["id", "name", "categoryId", "_count", "_max", "_min"],
  SubCategoryScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "name", "categoryId"],
  OrderWhereInput: ["AND", "OR", "NOT", "id", "userId", "totalPrice", "status", "createdAt", "updatedAt", "user", "items"],
  OrderOrderByWithRelationInput: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt", "user", "items"],
  OrderWhereUniqueInput: ["id", "AND", "OR", "NOT", "userId", "totalPrice", "status", "createdAt", "updatedAt", "user", "items"],
  OrderOrderByWithAggregationInput: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt", "_count", "_avg", "_max", "_min", "_sum"],
  OrderScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "userId", "totalPrice", "status", "createdAt", "updatedAt"],
  OrderItemWhereInput: ["AND", "OR", "NOT", "id", "orderId", "furnitureItemId", "quantity", "price", "createdAt", "order", "furnitureItem"],
  OrderItemOrderByWithRelationInput: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt", "order", "furnitureItem"],
  OrderItemWhereUniqueInput: ["id", "AND", "OR", "NOT", "orderId", "furnitureItemId", "quantity", "price", "createdAt", "order", "furnitureItem"],
  OrderItemOrderByWithAggregationInput: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt", "_count", "_avg", "_max", "_min", "_sum"],
  OrderItemScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "orderId", "furnitureItemId", "quantity", "price", "createdAt"],
  CartItemWhereInput: ["AND", "OR", "NOT", "id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt", "user", "furnitureItem"],
  CartItemOrderByWithRelationInput: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt", "user", "furnitureItem"],
  CartItemWhereUniqueInput: ["id", "AND", "OR", "NOT", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt", "user", "furnitureItem"],
  CartItemOrderByWithAggregationInput: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt", "_count", "_avg", "_max", "_min", "_sum"],
  CartItemScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  FavouriteWhereInput: ["AND", "OR", "NOT", "id", "userId", "furnitureItemId", "createdAt", "user", "furnitureItem"],
  FavouriteOrderByWithRelationInput: ["id", "userId", "furnitureItemId", "createdAt", "user", "furnitureItem"],
  FavouriteWhereUniqueInput: ["id", "AND", "OR", "NOT", "userId", "furnitureItemId", "createdAt", "user", "furnitureItem"],
  FavouriteOrderByWithAggregationInput: ["id", "userId", "furnitureItemId", "createdAt", "_count", "_max", "_min"],
  FavouriteScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "userId", "furnitureItemId", "createdAt"],
  ReviewWhereInput: ["AND", "OR", "NOT", "id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt", "user", "furnitureItem"],
  ReviewOrderByWithRelationInput: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt", "user", "furnitureItem"],
  ReviewWhereUniqueInput: ["id", "AND", "OR", "NOT", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt", "user", "furnitureItem"],
  ReviewOrderByWithAggregationInput: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt", "_count", "_avg", "_max", "_min", "_sum"],
  ReviewScalarWhereWithAggregatesInput: ["AND", "OR", "NOT", "id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"],
  UserCreateInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "cartItems", "favourites", "reviews"],
  UserUpdateInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "cartItems", "favourites", "reviews"],
  UserCreateManyInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  UserUpdateManyMutationInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  AddressCreateInput: ["id", "street", "city", "state", "postalCode", "country", "createdAt", "user"],
  AddressUpdateInput: ["id", "street", "city", "state", "postalCode", "country", "createdAt", "user"],
  AddressCreateManyInput: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt"],
  AddressUpdateManyMutationInput: ["id", "street", "city", "state", "postalCode", "country", "createdAt"],
  FurnitureItemCreateInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "reviews", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemUpdateInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "reviews", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemCreateManyInput: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt"],
  FurnitureItemUpdateManyMutationInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt"],
  CategoryCreateInput: ["id", "name", "subCategories", "furnitureItems"],
  CategoryUpdateInput: ["id", "name", "subCategories", "furnitureItems"],
  CategoryCreateManyInput: ["id", "name"],
  CategoryUpdateManyMutationInput: ["id", "name"],
  SubCategoryCreateInput: ["id", "name", "category", "furnitureItems"],
  SubCategoryUpdateInput: ["id", "name", "category", "furnitureItems"],
  SubCategoryCreateManyInput: ["id", "name", "categoryId"],
  SubCategoryUpdateManyMutationInput: ["id", "name"],
  OrderCreateInput: ["id", "totalPrice", "status", "createdAt", "updatedAt", "user", "items"],
  OrderUpdateInput: ["id", "totalPrice", "status", "createdAt", "updatedAt", "user", "items"],
  OrderCreateManyInput: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt"],
  OrderUpdateManyMutationInput: ["id", "totalPrice", "status", "createdAt", "updatedAt"],
  OrderItemCreateInput: ["id", "quantity", "price", "createdAt", "order", "furnitureItem"],
  OrderItemUpdateInput: ["id", "quantity", "price", "createdAt", "order", "furnitureItem"],
  OrderItemCreateManyInput: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt"],
  OrderItemUpdateManyMutationInput: ["id", "quantity", "price", "createdAt"],
  CartItemCreateInput: ["id", "quantity", "createdAt", "updatedAt", "user", "furnitureItem"],
  CartItemUpdateInput: ["id", "quantity", "createdAt", "updatedAt", "user", "furnitureItem"],
  CartItemCreateManyInput: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  CartItemUpdateManyMutationInput: ["id", "quantity", "createdAt", "updatedAt"],
  FavouriteCreateInput: ["id", "createdAt", "user", "furnitureItem"],
  FavouriteUpdateInput: ["id", "createdAt", "user", "furnitureItem"],
  FavouriteCreateManyInput: ["id", "userId", "furnitureItemId", "createdAt"],
  FavouriteUpdateManyMutationInput: ["id", "createdAt"],
  ReviewCreateInput: ["id", "rating", "comment", "createdAt", "updatedAt", "user", "furnitureItem"],
  ReviewUpdateInput: ["id", "rating", "comment", "createdAt", "updatedAt", "user", "furnitureItem"],
  ReviewCreateManyInput: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"],
  ReviewUpdateManyMutationInput: ["id", "rating", "comment", "createdAt", "updatedAt"],
  StringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  BigIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  DateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  BoolFilter: ["equals", "not"],
  StringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not"],
  DateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  AddressNullableRelationFilter: ["is", "isNot"],
  OrderListRelationFilter: ["every", "some", "none"],
  CartItemListRelationFilter: ["every", "some", "none"],
  FavouriteListRelationFilter: ["every", "some", "none"],
  ReviewListRelationFilter: ["every", "some", "none"],
  SortOrderInput: ["sort", "nulls"],
  OrderOrderByRelationAggregateInput: ["_count"],
  CartItemOrderByRelationAggregateInput: ["_count"],
  FavouriteOrderByRelationAggregateInput: ["_count"],
  ReviewOrderByRelationAggregateInput: ["_count"],
  UserCountOrderByAggregateInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  UserAvgOrderByAggregateInput: ["mobileNumber"],
  UserMaxOrderByAggregateInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  UserMinOrderByAggregateInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt"],
  UserSumOrderByAggregateInput: ["mobileNumber"],
  StringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  BigIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  DateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  BoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  StringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "mode", "not", "_count", "_min", "_max"],
  DateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  UserRelationFilter: ["is", "isNot"],
  AddressCountOrderByAggregateInput: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt"],
  AddressMaxOrderByAggregateInput: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt"],
  AddressMinOrderByAggregateInput: ["id", "userId", "street", "city", "state", "postalCode", "country", "createdAt"],
  FloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  CategoryRelationFilter: ["is", "isNot"],
  SubCategoryRelationFilter: ["is", "isNot"],
  OrderItemListRelationFilter: ["every", "some", "none"],
  OrderItemOrderByRelationAggregateInput: ["_count"],
  FurnitureItemCountOrderByAggregateInput: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt"],
  FurnitureItemAvgOrderByAggregateInput: ["price"],
  FurnitureItemMaxOrderByAggregateInput: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt"],
  FurnitureItemMinOrderByAggregateInput: ["id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt"],
  FurnitureItemSumOrderByAggregateInput: ["price"],
  FloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  SubCategoryListRelationFilter: ["every", "some", "none"],
  FurnitureItemListRelationFilter: ["every", "some", "none"],
  SubCategoryOrderByRelationAggregateInput: ["_count"],
  FurnitureItemOrderByRelationAggregateInput: ["_count"],
  CategoryCountOrderByAggregateInput: ["id", "name"],
  CategoryMaxOrderByAggregateInput: ["id", "name"],
  CategoryMinOrderByAggregateInput: ["id", "name"],
  SubCategoryCountOrderByAggregateInput: ["id", "name", "categoryId"],
  SubCategoryMaxOrderByAggregateInput: ["id", "name", "categoryId"],
  SubCategoryMinOrderByAggregateInput: ["id", "name", "categoryId"],
  EnumOrderStatusFilter: ["equals", "in", "notIn", "not"],
  OrderCountOrderByAggregateInput: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt"],
  OrderAvgOrderByAggregateInput: ["totalPrice"],
  OrderMaxOrderByAggregateInput: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt"],
  OrderMinOrderByAggregateInput: ["id", "userId", "totalPrice", "status", "createdAt", "updatedAt"],
  OrderSumOrderByAggregateInput: ["totalPrice"],
  EnumOrderStatusWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  IntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  OrderRelationFilter: ["is", "isNot"],
  FurnitureItemRelationFilter: ["is", "isNot"],
  OrderItemCountOrderByAggregateInput: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt"],
  OrderItemAvgOrderByAggregateInput: ["quantity", "price"],
  OrderItemMaxOrderByAggregateInput: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt"],
  OrderItemMinOrderByAggregateInput: ["id", "orderId", "furnitureItemId", "quantity", "price", "createdAt"],
  OrderItemSumOrderByAggregateInput: ["quantity", "price"],
  IntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  CartItemCountOrderByAggregateInput: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  CartItemAvgOrderByAggregateInput: ["quantity"],
  CartItemMaxOrderByAggregateInput: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  CartItemMinOrderByAggregateInput: ["id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  CartItemSumOrderByAggregateInput: ["quantity"],
  FavouriteCountOrderByAggregateInput: ["id", "userId", "furnitureItemId", "createdAt"],
  FavouriteMaxOrderByAggregateInput: ["id", "userId", "furnitureItemId", "createdAt"],
  FavouriteMinOrderByAggregateInput: ["id", "userId", "furnitureItemId", "createdAt"],
  ReviewCountOrderByAggregateInput: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"],
  ReviewAvgOrderByAggregateInput: ["rating"],
  ReviewMaxOrderByAggregateInput: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"],
  ReviewMinOrderByAggregateInput: ["id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"],
  ReviewSumOrderByAggregateInput: ["rating"],
  AddressCreateNestedOneWithoutUserInput: ["create", "connectOrCreate", "connect"],
  OrderCreateNestedManyWithoutUserInput: ["create", "connectOrCreate", "createMany", "connect"],
  CartItemCreateNestedManyWithoutUserInput: ["create", "connectOrCreate", "createMany", "connect"],
  FavouriteCreateNestedManyWithoutUserInput: ["create", "connectOrCreate", "createMany", "connect"],
  ReviewCreateNestedManyWithoutUserInput: ["create", "connectOrCreate", "createMany", "connect"],
  StringFieldUpdateOperationsInput: ["set"],
  BigIntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  DateTimeFieldUpdateOperationsInput: ["set"],
  BoolFieldUpdateOperationsInput: ["set"],
  NullableStringFieldUpdateOperationsInput: ["set"],
  NullableDateTimeFieldUpdateOperationsInput: ["set"],
  AddressUpdateOneWithoutUserNestedInput: ["create", "connectOrCreate", "upsert", "disconnect", "delete", "connect", "update"],
  OrderUpdateManyWithoutUserNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  CartItemUpdateManyWithoutUserNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  FavouriteUpdateManyWithoutUserNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  ReviewUpdateManyWithoutUserNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  UserCreateNestedOneWithoutAddressInput: ["create", "connectOrCreate", "connect"],
  UserUpdateOneRequiredWithoutAddressNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  CategoryCreateNestedOneWithoutFurnitureItemsInput: ["create", "connectOrCreate", "connect"],
  SubCategoryCreateNestedOneWithoutFurnitureItemsInput: ["create", "connectOrCreate", "connect"],
  ReviewCreateNestedManyWithoutFurnitureItemInput: ["create", "connectOrCreate", "createMany", "connect"],
  FavouriteCreateNestedManyWithoutFurnitureItemInput: ["create", "connectOrCreate", "createMany", "connect"],
  CartItemCreateNestedManyWithoutFurnitureItemInput: ["create", "connectOrCreate", "createMany", "connect"],
  OrderItemCreateNestedManyWithoutFurnitureItemInput: ["create", "connectOrCreate", "createMany", "connect"],
  FloatFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  CategoryUpdateOneRequiredWithoutFurnitureItemsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  SubCategoryUpdateOneRequiredWithoutFurnitureItemsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  ReviewUpdateManyWithoutFurnitureItemNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  FavouriteUpdateManyWithoutFurnitureItemNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  CartItemUpdateManyWithoutFurnitureItemNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  OrderItemUpdateManyWithoutFurnitureItemNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  SubCategoryCreateNestedManyWithoutCategoryInput: ["create", "connectOrCreate", "createMany", "connect"],
  FurnitureItemCreateNestedManyWithoutCategoryInput: ["create", "connectOrCreate", "createMany", "connect"],
  SubCategoryUpdateManyWithoutCategoryNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  FurnitureItemUpdateManyWithoutCategoryNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  CategoryCreateNestedOneWithoutSubCategoriesInput: ["create", "connectOrCreate", "connect"],
  FurnitureItemCreateNestedManyWithoutSubCategoryInput: ["create", "connectOrCreate", "createMany", "connect"],
  CategoryUpdateOneRequiredWithoutSubCategoriesNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  FurnitureItemUpdateManyWithoutSubCategoryNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  UserCreateNestedOneWithoutOrdersInput: ["create", "connectOrCreate", "connect"],
  OrderItemCreateNestedManyWithoutOrderInput: ["create", "connectOrCreate", "createMany", "connect"],
  EnumOrderStatusFieldUpdateOperationsInput: ["set"],
  UserUpdateOneRequiredWithoutOrdersNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  OrderItemUpdateManyWithoutOrderNestedInput: ["create", "connectOrCreate", "upsert", "createMany", "set", "disconnect", "delete", "connect", "update", "updateMany", "deleteMany"],
  OrderCreateNestedOneWithoutItemsInput: ["create", "connectOrCreate", "connect"],
  FurnitureItemCreateNestedOneWithoutFurnitureItemInput: ["create", "connectOrCreate", "connect"],
  IntFieldUpdateOperationsInput: ["set", "increment", "decrement", "multiply", "divide"],
  OrderUpdateOneRequiredWithoutItemsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  FurnitureItemUpdateOneRequiredWithoutFurnitureItemNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserCreateNestedOneWithoutCartItemsInput: ["create", "connectOrCreate", "connect"],
  FurnitureItemCreateNestedOneWithoutCartItemsInput: ["create", "connectOrCreate", "connect"],
  UserUpdateOneRequiredWithoutCartItemsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  FurnitureItemUpdateOneRequiredWithoutCartItemsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserCreateNestedOneWithoutFavouritesInput: ["create", "connectOrCreate", "connect"],
  FurnitureItemCreateNestedOneWithoutFavouritesInput: ["create", "connectOrCreate", "connect"],
  UserUpdateOneRequiredWithoutFavouritesNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  FurnitureItemUpdateOneRequiredWithoutFavouritesNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  UserCreateNestedOneWithoutReviewsInput: ["create", "connectOrCreate", "connect"],
  FurnitureItemCreateNestedOneWithoutReviewsInput: ["create", "connectOrCreate", "connect"],
  UserUpdateOneRequiredWithoutReviewsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  FurnitureItemUpdateOneRequiredWithoutReviewsNestedInput: ["create", "connectOrCreate", "upsert", "connect", "update"],
  NestedStringFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedBigIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedBoolFilter: ["equals", "not"],
  NestedStringNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not"],
  NestedDateTimeNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedStringWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedBigIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedFloatFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedBoolWithAggregatesFilter: ["equals", "not", "_count", "_min", "_max"],
  NestedStringNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "contains", "startsWith", "endsWith", "not", "_count", "_min", "_max"],
  NestedIntNullableFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not"],
  NestedDateTimeNullableWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_min", "_max"],
  NestedFloatWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  NestedEnumOrderStatusFilter: ["equals", "in", "notIn", "not"],
  NestedEnumOrderStatusWithAggregatesFilter: ["equals", "in", "notIn", "not", "_count", "_min", "_max"],
  NestedIntWithAggregatesFilter: ["equals", "in", "notIn", "lt", "lte", "gt", "gte", "not", "_count", "_avg", "_sum", "_min", "_max"],
  AddressCreateWithoutUserInput: ["id", "street", "city", "state", "postalCode", "country", "createdAt"],
  AddressCreateOrConnectWithoutUserInput: ["where", "create"],
  OrderCreateWithoutUserInput: ["id", "totalPrice", "status", "createdAt", "updatedAt", "items"],
  OrderCreateOrConnectWithoutUserInput: ["where", "create"],
  OrderCreateManyUserInputEnvelope: ["data", "skipDuplicates"],
  CartItemCreateWithoutUserInput: ["id", "quantity", "createdAt", "updatedAt", "furnitureItem"],
  CartItemCreateOrConnectWithoutUserInput: ["where", "create"],
  CartItemCreateManyUserInputEnvelope: ["data", "skipDuplicates"],
  FavouriteCreateWithoutUserInput: ["id", "createdAt", "furnitureItem"],
  FavouriteCreateOrConnectWithoutUserInput: ["where", "create"],
  FavouriteCreateManyUserInputEnvelope: ["data", "skipDuplicates"],
  ReviewCreateWithoutUserInput: ["id", "rating", "comment", "createdAt", "updatedAt", "furnitureItem"],
  ReviewCreateOrConnectWithoutUserInput: ["where", "create"],
  ReviewCreateManyUserInputEnvelope: ["data", "skipDuplicates"],
  AddressUpsertWithoutUserInput: ["update", "create", "where"],
  AddressUpdateToOneWithWhereWithoutUserInput: ["where", "data"],
  AddressUpdateWithoutUserInput: ["id", "street", "city", "state", "postalCode", "country", "createdAt"],
  OrderUpsertWithWhereUniqueWithoutUserInput: ["where", "update", "create"],
  OrderUpdateWithWhereUniqueWithoutUserInput: ["where", "data"],
  OrderUpdateManyWithWhereWithoutUserInput: ["where", "data"],
  OrderScalarWhereInput: ["AND", "OR", "NOT", "id", "userId", "totalPrice", "status", "createdAt", "updatedAt"],
  CartItemUpsertWithWhereUniqueWithoutUserInput: ["where", "update", "create"],
  CartItemUpdateWithWhereUniqueWithoutUserInput: ["where", "data"],
  CartItemUpdateManyWithWhereWithoutUserInput: ["where", "data"],
  CartItemScalarWhereInput: ["AND", "OR", "NOT", "id", "userId", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  FavouriteUpsertWithWhereUniqueWithoutUserInput: ["where", "update", "create"],
  FavouriteUpdateWithWhereUniqueWithoutUserInput: ["where", "data"],
  FavouriteUpdateManyWithWhereWithoutUserInput: ["where", "data"],
  FavouriteScalarWhereInput: ["AND", "OR", "NOT", "id", "userId", "furnitureItemId", "createdAt"],
  ReviewUpsertWithWhereUniqueWithoutUserInput: ["where", "update", "create"],
  ReviewUpdateWithWhereUniqueWithoutUserInput: ["where", "data"],
  ReviewUpdateManyWithWhereWithoutUserInput: ["where", "data"],
  ReviewScalarWhereInput: ["AND", "OR", "NOT", "id", "userId", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"],
  UserCreateWithoutAddressInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "orders", "cartItems", "favourites", "reviews"],
  UserCreateOrConnectWithoutAddressInput: ["where", "create"],
  UserUpsertWithoutAddressInput: ["update", "create", "where"],
  UserUpdateToOneWithWhereWithoutAddressInput: ["where", "data"],
  UserUpdateWithoutAddressInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "orders", "cartItems", "favourites", "reviews"],
  CategoryCreateWithoutFurnitureItemsInput: ["id", "name", "subCategories"],
  CategoryCreateOrConnectWithoutFurnitureItemsInput: ["where", "create"],
  SubCategoryCreateWithoutFurnitureItemsInput: ["id", "name", "category"],
  SubCategoryCreateOrConnectWithoutFurnitureItemsInput: ["where", "create"],
  ReviewCreateWithoutFurnitureItemInput: ["id", "rating", "comment", "createdAt", "updatedAt", "user"],
  ReviewCreateOrConnectWithoutFurnitureItemInput: ["where", "create"],
  ReviewCreateManyFurnitureItemInputEnvelope: ["data", "skipDuplicates"],
  FavouriteCreateWithoutFurnitureItemInput: ["id", "createdAt", "user"],
  FavouriteCreateOrConnectWithoutFurnitureItemInput: ["where", "create"],
  FavouriteCreateManyFurnitureItemInputEnvelope: ["data", "skipDuplicates"],
  CartItemCreateWithoutFurnitureItemInput: ["id", "quantity", "createdAt", "updatedAt", "user"],
  CartItemCreateOrConnectWithoutFurnitureItemInput: ["where", "create"],
  CartItemCreateManyFurnitureItemInputEnvelope: ["data", "skipDuplicates"],
  OrderItemCreateWithoutFurnitureItemInput: ["id", "quantity", "price", "createdAt", "order"],
  OrderItemCreateOrConnectWithoutFurnitureItemInput: ["where", "create"],
  OrderItemCreateManyFurnitureItemInputEnvelope: ["data", "skipDuplicates"],
  CategoryUpsertWithoutFurnitureItemsInput: ["update", "create", "where"],
  CategoryUpdateToOneWithWhereWithoutFurnitureItemsInput: ["where", "data"],
  CategoryUpdateWithoutFurnitureItemsInput: ["id", "name", "subCategories"],
  SubCategoryUpsertWithoutFurnitureItemsInput: ["update", "create", "where"],
  SubCategoryUpdateToOneWithWhereWithoutFurnitureItemsInput: ["where", "data"],
  SubCategoryUpdateWithoutFurnitureItemsInput: ["id", "name", "category"],
  ReviewUpsertWithWhereUniqueWithoutFurnitureItemInput: ["where", "update", "create"],
  ReviewUpdateWithWhereUniqueWithoutFurnitureItemInput: ["where", "data"],
  ReviewUpdateManyWithWhereWithoutFurnitureItemInput: ["where", "data"],
  FavouriteUpsertWithWhereUniqueWithoutFurnitureItemInput: ["where", "update", "create"],
  FavouriteUpdateWithWhereUniqueWithoutFurnitureItemInput: ["where", "data"],
  FavouriteUpdateManyWithWhereWithoutFurnitureItemInput: ["where", "data"],
  CartItemUpsertWithWhereUniqueWithoutFurnitureItemInput: ["where", "update", "create"],
  CartItemUpdateWithWhereUniqueWithoutFurnitureItemInput: ["where", "data"],
  CartItemUpdateManyWithWhereWithoutFurnitureItemInput: ["where", "data"],
  OrderItemUpsertWithWhereUniqueWithoutFurnitureItemInput: ["where", "update", "create"],
  OrderItemUpdateWithWhereUniqueWithoutFurnitureItemInput: ["where", "data"],
  OrderItemUpdateManyWithWhereWithoutFurnitureItemInput: ["where", "data"],
  OrderItemScalarWhereInput: ["AND", "OR", "NOT", "id", "orderId", "furnitureItemId", "quantity", "price", "createdAt"],
  SubCategoryCreateWithoutCategoryInput: ["id", "name", "furnitureItems"],
  SubCategoryCreateOrConnectWithoutCategoryInput: ["where", "create"],
  SubCategoryCreateManyCategoryInputEnvelope: ["data", "skipDuplicates"],
  FurnitureItemCreateWithoutCategoryInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "subCategory", "reviews", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemCreateOrConnectWithoutCategoryInput: ["where", "create"],
  FurnitureItemCreateManyCategoryInputEnvelope: ["data", "skipDuplicates"],
  SubCategoryUpsertWithWhereUniqueWithoutCategoryInput: ["where", "update", "create"],
  SubCategoryUpdateWithWhereUniqueWithoutCategoryInput: ["where", "data"],
  SubCategoryUpdateManyWithWhereWithoutCategoryInput: ["where", "data"],
  SubCategoryScalarWhereInput: ["AND", "OR", "NOT", "id", "name", "categoryId"],
  FurnitureItemUpsertWithWhereUniqueWithoutCategoryInput: ["where", "update", "create"],
  FurnitureItemUpdateWithWhereUniqueWithoutCategoryInput: ["where", "data"],
  FurnitureItemUpdateManyWithWhereWithoutCategoryInput: ["where", "data"],
  FurnitureItemScalarWhereInput: ["AND", "OR", "NOT", "id", "name", "description", "price", "picture", "categoryId", "subCategoryId", "createdAt", "updatedAt"],
  CategoryCreateWithoutSubCategoriesInput: ["id", "name", "furnitureItems"],
  CategoryCreateOrConnectWithoutSubCategoriesInput: ["where", "create"],
  FurnitureItemCreateWithoutSubCategoryInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "reviews", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemCreateOrConnectWithoutSubCategoryInput: ["where", "create"],
  FurnitureItemCreateManySubCategoryInputEnvelope: ["data", "skipDuplicates"],
  CategoryUpsertWithoutSubCategoriesInput: ["update", "create", "where"],
  CategoryUpdateToOneWithWhereWithoutSubCategoriesInput: ["where", "data"],
  CategoryUpdateWithoutSubCategoriesInput: ["id", "name", "furnitureItems"],
  FurnitureItemUpsertWithWhereUniqueWithoutSubCategoryInput: ["where", "update", "create"],
  FurnitureItemUpdateWithWhereUniqueWithoutSubCategoryInput: ["where", "data"],
  FurnitureItemUpdateManyWithWhereWithoutSubCategoryInput: ["where", "data"],
  UserCreateWithoutOrdersInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "cartItems", "favourites", "reviews"],
  UserCreateOrConnectWithoutOrdersInput: ["where", "create"],
  OrderItemCreateWithoutOrderInput: ["id", "quantity", "price", "createdAt", "furnitureItem"],
  OrderItemCreateOrConnectWithoutOrderInput: ["where", "create"],
  OrderItemCreateManyOrderInputEnvelope: ["data", "skipDuplicates"],
  UserUpsertWithoutOrdersInput: ["update", "create", "where"],
  UserUpdateToOneWithWhereWithoutOrdersInput: ["where", "data"],
  UserUpdateWithoutOrdersInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "cartItems", "favourites", "reviews"],
  OrderItemUpsertWithWhereUniqueWithoutOrderInput: ["where", "update", "create"],
  OrderItemUpdateWithWhereUniqueWithoutOrderInput: ["where", "data"],
  OrderItemUpdateManyWithWhereWithoutOrderInput: ["where", "data"],
  OrderCreateWithoutItemsInput: ["id", "totalPrice", "status", "createdAt", "updatedAt", "user"],
  OrderCreateOrConnectWithoutItemsInput: ["where", "create"],
  FurnitureItemCreateWithoutFurnitureItemInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "reviews", "favourites", "cartItems"],
  FurnitureItemCreateOrConnectWithoutFurnitureItemInput: ["where", "create"],
  OrderUpsertWithoutItemsInput: ["update", "create", "where"],
  OrderUpdateToOneWithWhereWithoutItemsInput: ["where", "data"],
  OrderUpdateWithoutItemsInput: ["id", "totalPrice", "status", "createdAt", "updatedAt", "user"],
  FurnitureItemUpsertWithoutFurnitureItemInput: ["update", "create", "where"],
  FurnitureItemUpdateToOneWithWhereWithoutFurnitureItemInput: ["where", "data"],
  FurnitureItemUpdateWithoutFurnitureItemInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "reviews", "favourites", "cartItems"],
  UserCreateWithoutCartItemsInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "favourites", "reviews"],
  UserCreateOrConnectWithoutCartItemsInput: ["where", "create"],
  FurnitureItemCreateWithoutCartItemsInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "reviews", "favourites", "furnitureItem"],
  FurnitureItemCreateOrConnectWithoutCartItemsInput: ["where", "create"],
  UserUpsertWithoutCartItemsInput: ["update", "create", "where"],
  UserUpdateToOneWithWhereWithoutCartItemsInput: ["where", "data"],
  UserUpdateWithoutCartItemsInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "favourites", "reviews"],
  FurnitureItemUpsertWithoutCartItemsInput: ["update", "create", "where"],
  FurnitureItemUpdateToOneWithWhereWithoutCartItemsInput: ["where", "data"],
  FurnitureItemUpdateWithoutCartItemsInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "reviews", "favourites", "furnitureItem"],
  UserCreateWithoutFavouritesInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "cartItems", "reviews"],
  UserCreateOrConnectWithoutFavouritesInput: ["where", "create"],
  FurnitureItemCreateWithoutFavouritesInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "reviews", "cartItems", "furnitureItem"],
  FurnitureItemCreateOrConnectWithoutFavouritesInput: ["where", "create"],
  UserUpsertWithoutFavouritesInput: ["update", "create", "where"],
  UserUpdateToOneWithWhereWithoutFavouritesInput: ["where", "data"],
  UserUpdateWithoutFavouritesInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "cartItems", "reviews"],
  FurnitureItemUpsertWithoutFavouritesInput: ["update", "create", "where"],
  FurnitureItemUpdateToOneWithWhereWithoutFavouritesInput: ["where", "data"],
  FurnitureItemUpdateWithoutFavouritesInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "reviews", "cartItems", "furnitureItem"],
  UserCreateWithoutReviewsInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "cartItems", "favourites"],
  UserCreateOrConnectWithoutReviewsInput: ["where", "create"],
  FurnitureItemCreateWithoutReviewsInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemCreateOrConnectWithoutReviewsInput: ["where", "create"],
  UserUpsertWithoutReviewsInput: ["update", "create", "where"],
  UserUpdateToOneWithWhereWithoutReviewsInput: ["where", "data"],
  UserUpdateWithoutReviewsInput: ["id", "name", "email", "mobileNumber", "dateOfBirth", "password", "isEmailVerified", "verificationCode", "resetToken", "resetTokenExpiry", "profilePicture", "createdAt", "updatedAt", "address", "orders", "cartItems", "favourites"],
  FurnitureItemUpsertWithoutReviewsInput: ["update", "create", "where"],
  FurnitureItemUpdateToOneWithWhereWithoutReviewsInput: ["where", "data"],
  FurnitureItemUpdateWithoutReviewsInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "subCategory", "favourites", "cartItems", "furnitureItem"],
  OrderCreateManyUserInput: ["id", "totalPrice", "status", "createdAt", "updatedAt"],
  CartItemCreateManyUserInput: ["id", "furnitureItemId", "quantity", "createdAt", "updatedAt"],
  FavouriteCreateManyUserInput: ["id", "furnitureItemId", "createdAt"],
  ReviewCreateManyUserInput: ["id", "furnitureItemId", "rating", "comment", "createdAt", "updatedAt"],
  OrderUpdateWithoutUserInput: ["id", "totalPrice", "status", "createdAt", "updatedAt", "items"],
  CartItemUpdateWithoutUserInput: ["id", "quantity", "createdAt", "updatedAt", "furnitureItem"],
  FavouriteUpdateWithoutUserInput: ["id", "createdAt", "furnitureItem"],
  ReviewUpdateWithoutUserInput: ["id", "rating", "comment", "createdAt", "updatedAt", "furnitureItem"],
  ReviewCreateManyFurnitureItemInput: ["id", "userId", "rating", "comment", "createdAt", "updatedAt"],
  FavouriteCreateManyFurnitureItemInput: ["id", "userId", "createdAt"],
  CartItemCreateManyFurnitureItemInput: ["id", "userId", "quantity", "createdAt", "updatedAt"],
  OrderItemCreateManyFurnitureItemInput: ["id", "orderId", "quantity", "price", "createdAt"],
  ReviewUpdateWithoutFurnitureItemInput: ["id", "rating", "comment", "createdAt", "updatedAt", "user"],
  FavouriteUpdateWithoutFurnitureItemInput: ["id", "createdAt", "user"],
  CartItemUpdateWithoutFurnitureItemInput: ["id", "quantity", "createdAt", "updatedAt", "user"],
  OrderItemUpdateWithoutFurnitureItemInput: ["id", "quantity", "price", "createdAt", "order"],
  SubCategoryCreateManyCategoryInput: ["id", "name"],
  FurnitureItemCreateManyCategoryInput: ["id", "name", "description", "price", "picture", "subCategoryId", "createdAt", "updatedAt"],
  SubCategoryUpdateWithoutCategoryInput: ["id", "name", "furnitureItems"],
  FurnitureItemUpdateWithoutCategoryInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "subCategory", "reviews", "favourites", "cartItems", "furnitureItem"],
  FurnitureItemCreateManySubCategoryInput: ["id", "name", "description", "price", "picture", "categoryId", "createdAt", "updatedAt"],
  FurnitureItemUpdateWithoutSubCategoryInput: ["id", "name", "description", "price", "picture", "createdAt", "updatedAt", "category", "reviews", "favourites", "cartItems", "furnitureItem"],
  OrderItemCreateManyOrderInput: ["id", "furnitureItemId", "quantity", "price", "createdAt"],
  OrderItemUpdateWithoutOrderInput: ["id", "quantity", "price", "createdAt", "furnitureItem"]
};

type InputTypesNames = keyof typeof inputTypes;

type InputTypeFieldNames<TInput extends InputTypesNames> = Exclude<
  keyof typeof inputTypes[TInput]["prototype"],
  number | symbol
>;

type InputTypeFieldsConfig<
  TInput extends InputTypesNames
> = FieldsConfig<InputTypeFieldNames<TInput>>;

export type InputTypeConfig<TInput extends InputTypesNames> = {
  class?: ClassDecorator[];
  fields?: InputTypeFieldsConfig<TInput>;
};

export type InputTypesEnhanceMap = {
  [TInput in InputTypesNames]?: InputTypeConfig<TInput>;
};

export function applyInputTypesEnhanceMap(
  inputTypesEnhanceMap: InputTypesEnhanceMap,
) {
  for (const inputTypeEnhanceMapKey of Object.keys(inputTypesEnhanceMap)) {
    const inputTypeName = inputTypeEnhanceMapKey as keyof typeof inputTypesEnhanceMap;
    const typeConfig = inputTypesEnhanceMap[inputTypeName]!;
    const typeClass = inputTypes[inputTypeName];
    const typeTarget = typeClass.prototype;
    applyTypeClassEnhanceConfig(
      typeConfig,
      typeClass,
      typeTarget,
      inputsInfo[inputTypeName as keyof typeof inputsInfo],
    );
  }
}

