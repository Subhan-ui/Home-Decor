import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
  id = "id",
  name = "name",
  email = "email",
  mobileNumber = "mobileNumber",
  dateOfBirth = "dateOfBirth",
  password = "password",
  isEmailVerified = "isEmailVerified",
  verificationCode = "verificationCode",
  role = "role",
  resetToken = "resetToken",
  resetTokenExpiry = "resetTokenExpiry",
  profilePicture = "profilePicture",
  refreshToken = "refreshToken",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
  name: "UserScalarFieldEnum",
  description: undefined,
});
