import { RepositoryBase } from "./repository-base";
import { SeederService } from "../services/SeederService";
import { inject } from "aurelia";

/**
 * Repository to perform bulk actions on companies.
 */
 @inject()
export class PersonRepository extends RepositoryBase {
  private peopleList = [];

  constructor(public readonly seederService: SeederService) {
    super();

    this.peopleList = seederService.people;
  }

  public people() {
    return this.peopleList;
  }

  public person(id: string) {
    return this.peopleList.find((p) => p.id === id);
  }

  public get personCount(): number {
    return this.peopleList.length;
  }
}
