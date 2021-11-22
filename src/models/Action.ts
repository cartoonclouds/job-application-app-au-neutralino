import { ContactMethod } from "../enums/contact-method";
import { Person } from "./Person";
import { Model } from "./Model";
import { modelSchema } from "../decorators/model-schema";

/**
 * Action model
 */
@modelSchema({
  parentAction: "Action",
  contactPerson: "Person",
  comments: "string",
  contactMethod: "ContactMethod",
})
export class Action extends Model<Action> {
  public parentAction?: Action;
  public contactPerson?: Person;
  public comments?: string;
  public requiresFollowup: boolean = false;
  public contactMethod?: ContactMethod;

  constructor(attributes?: Partial<Action>) {
    super(attributes);
  }
}
