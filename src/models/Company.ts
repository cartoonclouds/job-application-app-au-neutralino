import { Model } from "./Model";
import { modelSchema } from "../decorators/model-schema";
/**
 * Company Model
 */
@modelSchema({
  name: "string",
  email: "string",
  phone: "string",
  url: "string",
  comments: "string",
})
export class Company extends Model<Company> {
  public name?: string;
  public email?: string;
  public phone?: string;
  public url?: string;
  public comments?: string;

  constructor(attributes?: Partial<Company>) {
    super(attributes);
  }
}
