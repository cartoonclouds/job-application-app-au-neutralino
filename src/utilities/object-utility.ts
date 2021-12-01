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

  /**
   * Helper function of Object.assign - joins two or more objects.
   *
   * @param obj1
   * @param obj2
   * @returns
   */
  public static joinIntoNew(obj1, obj2): object {
    return Object.assign({}, arguments);
  }
}
