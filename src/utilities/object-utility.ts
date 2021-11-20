import { Job } from "../models/Job";

type ResolversParentTypes = "PayRate" | "NumberRange";

export class ObjectUtility {
  /**
   * Determines if object is of supplied typename
   *
   * @param obj
   * @param typename
   */
  public static isType<ModelType extends keyof ResolversParentTypes>(
    obj: any,
    typename: ModelType
  ): obj is ResolversParentTypes[ModelType] {
    return obj?.__typename === typename;
  }
}
