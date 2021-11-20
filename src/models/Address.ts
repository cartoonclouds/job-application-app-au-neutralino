import { modelSchema } from "../decorators/model-schema";
import { Model } from "./Model";

/**
 * Address model
 */
@modelSchema({
  address_line_1: "string",
  address_line_2: "string",
  suburb: "string",
  state: "string",
  postcode: "number",
  country: "string",
})
export class Address extends Model<Address> {
  public address_line_1?: string;
  public address_line_2?: string;
  public suburb?: string;
  public state?: string;
  public postcode?: number;
  public country?: string;

  constructor(attributes?: Partial<Address>) {
    super(attributes);
  }
}
