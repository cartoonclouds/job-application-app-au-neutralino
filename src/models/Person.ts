import { Address } from "./Address";
import { Model } from "./Model";
import { modelSchema } from "../decorators/model-schema";

/**
 * Person Model
 */
@modelSchema({
  name: "string",
  email: "string",
  title: "string",
  address: "Address",
})
export class Person extends Model<Person> {
  public name?: string;
  public email?: string;
  public title?: string;
  public address?: Address;
}
