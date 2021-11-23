import { inject } from "aurelia";
import { RepositoryBase } from "./repository-base";

/**
 * Repository to perform bulk actions on addresses.
 */
 @inject()
export class AddressRepository extends RepositoryBase {
  public static addresses() {
    //TODO find all addresses attached to Company, Job, Person, User
    //TODO categorise gathered addresses
    //In future will come from database
    return [];
  }

  public static address(id: string) {
    // return AddressRepository.companies.find(c => c.id === id);
  }

  public static addressCount(): number {
    return AddressRepository.addresses().length;
  }
}
