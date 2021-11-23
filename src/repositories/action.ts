import { RepositoryBase } from "./repository-base";
import { JobApplication } from "../models/JobApplication";
import { Action } from "../models/Action";
import { SeederService } from "../services/SeederService";
import { inject } from "aurelia";

/**
 * Repository to perform bulk actions on job actions
 */
@inject()
export class ActionRepository extends RepositoryBase {
  public actionsList = [];

  constructor(public readonly seederService: SeederService) {
    super();

    this.actionsList = seederService.actions;
  }

  public actions() {
    return this.actionsList;
  }

  public action(id: string) {
    return this.actionsList.find((a) => a.id === id);
  }

  public get actionsCount(): number {
    return this.actionsList.length;
  }

  /**
   * Returns an array of job applications which have been set as requiring follow-up.
   */
  public getActionsRequiringFollowup(): JobApplication[] {
    return this.actionsList.filter((action: Action) => action.requiresFollowup);
  }
}
