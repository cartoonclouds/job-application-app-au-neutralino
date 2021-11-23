import { RepositoryBase } from "./repository-base";
import { Company } from "../models/Company";
import { SeederService } from "../services/SeederService";
import { inject } from "aurelia";

/**
 * Repository to perform bulk actions on companies.
 */
 @inject()
export class CompanyRepository extends RepositoryBase {
  public companiesList = [];

  constructor(public readonly seederService: SeederService) {
    super();

    this.companiesList = seederService.companies;
  }

  public companies() {
    return this.companiesList;
  }

  public company(id: string) {
    return this.companiesList.find((c) => c.id === id);
  }

  public get companyCount(): number {
    return this.companiesList.length;
  }
}
