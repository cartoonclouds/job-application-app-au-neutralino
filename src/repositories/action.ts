import { RepositoryBase } from "./repository-base";
import { JobApplication } from "../models/JobApplication";
import { Action } from "../models/Action";

/**
 * Repository to perform bulk actions on job actions
 */
export class ActionRepository extends RepositoryBase {
  public static actionsList = [];

  public actions() {
    return ActionRepository.actionsList;
  }

  public action(id: string) {
    return ActionRepository.actionsList.find((a) => a.id === id);
  }

  public get actionsCount(): number {
    return ActionRepository.actionsList.length;
  }

  /**
   * Returns an array of job applications which have been set as requiring follow-up.
   */
  public getActionsRequiringFollowup(): JobApplication[] {
    return ActionRepository.actionsList.filter(
      (action: Action) => action.requiresFollowup
    );
  }
}
