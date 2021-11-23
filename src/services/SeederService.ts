import { Action } from "../models/Action";
import { Company } from "../models/Company";
import { JobApplication } from "../models/JobApplication";
import { Person } from "../models/Person";
import { User } from "../models/User";
import { JobApplicationSeeder } from "../seeders/job-application";
import { UserSeeder } from "../seeders/user";

const ISeederService = Symbol("ISeederService");

interface ISeederService {}

export class SeederService implements ISeederService {
  public applications: JobApplication[];
  public user: User;
  private _companies: Company[];
  private _actions: Action[];
  private _people: Person[];

  constructor() {
    this.user = UserSeeder.generate();

    this.applications = JobApplicationSeeder.run(
      Math.floor(Math.random() * 1) + 30
    );
  }

  public get companies() {
    this._companies =
      this._companies ||
      this.applications.map((app: JobApplication) => app.company);

    return this._companies;
  }

  public get actions() {
    this._actions =
      this._actions ||
      this.applications.map((app: JobApplication) => app.actions).flat();

    return this._actions;
  }

  public get people() {
    this._people = this._people || [
      ...this.companies.map((c: Company) => c.contactPeople).flat(),
      ...this.actions.map((a: Action) => a.contactPerson),
    ];

    return this._people;
  }
}
