import { bindable, inject } from "aurelia";
import { Company } from "../../models/Company";

@inject()
export class CompanyDetails {
  @bindable
  company: Company = new Company();
}
