import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { Address } from "../../../prisma/generated/type-graphql/models";
import { AddressResponse, Context } from "../../types/types";
import { address } from "../../services/address.services";

@Resolver()
export class AddressResolver {
  @Query(() => AddressResponse)
  async getAddress(@Ctx() ctx: Context) {
    return await address.getAdress(ctx);
  }

  @Mutation(() => Address)
  async addAddress(
    @Arg("street") street: string,
    @Arg("city") city: string,
    @Arg("state") state: string,
    @Arg("postalCode") postalCode: string,
    @Arg("country") country: string,
    @Ctx() ctx: Context
  ) {
    return await address.createAddress(
      { street, city, state, postalCode, country },
      ctx
    );
  }

  @Mutation(() => String)
  async updateAddress(
    @Arg("street") street: string,
    @Arg("city") city: string,
    @Arg("state") state: string,
    @Arg("postalCode") postalCode: string,
    @Arg("country") country: string,
    @Ctx() ctx: Context
  ) {
    return await address.updateAddress(
      { street, city, state, postalCode, country },
      ctx
    );
  }

  @Mutation(() => String)
  async deleteAddress(@Ctx() ctx: Context) {
    return await address.deleteAddress(ctx);
  }
}
