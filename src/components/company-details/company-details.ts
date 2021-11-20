import { bindable } from "aurelia";
import { Company } from "../../models/Company";

export class CompanyDetails {
  @bindable
  company: Company = new Company();
}
