import { RepositoryBase } from "./repository-base";
import { Company } from "../models/Company";

/**
 * Repository to perform bulk actions on companies.
 */
export class CompanyRepository extends RepositoryBase {
  public static companiesList = [
    new Company({
      name: "Big Burgers",
    }),
    new Company({
      name: "Chairs 'r Us",
    }),
    new Company({
      name: "Blankets Galour",
    }),
    new Company({
      name: "Chris, Chris and Chris",
      email: "chris@company.com",
      phone: "0401 943 694",
      url: "www.companyname.com",
      comments: "This is a really great company!",
    }),
  ];

  public companies() {
    return CompanyRepository.companiesList;
  }

  public company(id: string) {
    return CompanyRepository.companiesList.find((c) => c.id === id);
  }

  public get companyCount(): number {
    return CompanyRepository.companiesList.length;
  }
}
