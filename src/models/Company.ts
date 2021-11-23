import { Model } from "./Model";
import { modelSchema } from "../decorators/model-schema";
import { Address } from './Address';
import { Person } from './Person';
/**
 * Company Model
 */
@modelSchema({
  name: "string",
  email: "string",
  phone: "string",
  url: "string",
  comments: "string",
  address: "Address",
  contactPeople: "Person[]",
})
export class Company extends Model<Company> {
  public name?: string;
  public email?: string;
  public phone?: string;
  public url?: string;
  public comments?: string;
  public address: Address;
  public contactPeople?: Person[];

  constructor(attributes?: Partial<Company>) {
    super(attributes);
  }
}
