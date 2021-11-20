import { RepositoryBase } from "./repository-base";
import { Person } from '../models/Person';
import { Address } from '../models/Address';

/**
 * Repository to perform bulk actions on companies.
 */
export class PeopleRepository extends RepositoryBase {
  private static peopleList = [
    new Person({
      name: "Bob Smith",
      email: "bob.smith@gmail.com",
      address: new Address({
        address_line_1: "123 Main St",
        suburb: "Adelaide",
        state: "WA",
        postcode: 6501,
        country: "Australia",
      })
    }),
    new Person({
      name: "Jane Wonder",
      email: "wonderful@gmail.com",
      address: new Address({
        address_line_1: "65980 Third Rd",
        suburb: "Adelaide",
        state: "VIC",
        postcode: 2657,
        country: "Australia",
      })
    }),
    new Person({
      name: "Jake Black",
      email: "jblack@hotmail.com",
      address: new Address({
        address_line_1: "7A 354 Jetty Rd",
        suburb: "Adelaide",
        state: "SA",
        postcode: 5000,
        country: "Australia",
      })
    })
  ];

  public static people(id?: string) {
    return id ? this.peopleList.find(c => c.id === id) : this.peopleList;
  }

  public static peopleCount(): number {
    return this.peopleList.length;
  }
}
