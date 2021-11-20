import { bindable } from "aurelia";
import { Action } from "../../models/Action";

export class Actions {
  @bindable actions?: [Action];
}
