import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
  id = "id",
  name = "name",
  email = "email",
  mobileNumber = "mobileNumber",
  dateOfBirth = "dateOfBirth",
  password = "password",
  address = "address",
  isEmailVerified = "isEmailVerified",
  createdAt = "createdAt",
  verificationCode = "verificationCode",
  resetToken = "resetToken",
  resetTokenExpiry = "resetTokenExpiry"
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});
