import {
  Arg,
  Ctx,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
} from "type-graphql";
import { Context, ReviewItemType } from "../../types/types";
import { reviews } from "../../services/review.services";
import { Rating } from "../../../prisma/generated/type-graphql/enums/Rating";

registerEnumType(Rating, {
  name: "Rating",
  description: "The available ratings for an items",
});

@Resolver()
export class ReviewResolver {
  @Query(() => [ReviewItemType])
  async getReviews(@Arg("productId") productId: string, @Ctx() ctx: Context) {
    return await reviews.getReviews({ productId }, ctx);
  }
  @Mutation(() => String)
  async addReview(
    @Arg("productId") productId: string,
    @Arg("rating", () => Rating) rating: Rating,
    @Arg("comment") comment: string,
    @Ctx() ctx: Context
  ) {
    return await reviews.addReview({ productId, rating, comment }, ctx);
  }
  @Mutation(() => String)
  async deleteReview(@Arg("id") id: string, @Ctx() ctx: Context) {
    return await reviews.deleteReview({ id }, ctx);
  }
}
