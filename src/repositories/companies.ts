import { RepositoryBase } from "./repository-base";
import { Company } from '../models/Company';

/**
 * Repository to perform bulk actions on companies.
 */
export class CompaniesRepository extends RepositoryBase {
  private static companiesList = [
    new Company({
      name: "Big Burgers"
    }),
    new Company({
      name: "Chairs 'r Us"
    }),
    new Company({
      name: "Blankets Galour"
    }),
    new Company({
      name: "Chris, Chris and Chris",
      email: "chris@company.com",
      phone: "0401 943 694",
      url: "www.companyname.com",
      comments: "This is a really great company!",
    })
  ];

  public static companies() {
    return this.companiesList;
  }

  public static company(id: string) {
    return this.companiesList.find(c => c.id === id);
  }

  public static companyCount(): number {
    return this.companiesList.length;
  }
}
