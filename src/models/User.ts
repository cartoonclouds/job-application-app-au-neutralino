import { Address } from "./Address";
import { Model } from "./Model";
import { modelSchema } from "../decorators/model-schema";

/**
 * User Model
 */
@modelSchema({
  name: "string",
  email: "string",
  title: "string",
  address: "Address",
})
export class User extends Model<User> {
  public name?: string;
  public email?: string;
  public title?: string;
  public address?: Address;
}
