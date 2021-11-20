export const modelSchemaKey = Symbol("modelSchema");

/**
 * To the class schema.
 *
 * @example
 * @modelSchema({})
 * class Customer {}
 * @param className
 */
export function modelSchema(schema: object): ClassDecorator {
  return (Reflect as any).metadata(modelSchemaKey, schema);
}

/**
 * @example
 * const type = Customer;
 * getModelSchema(type); // {}
 * @param type
 */
export function getModelSchema(instance: Object): string {
  return (Reflect as any).getMetadata(modelSchemaKey, instance.constructor);
}

/**
 * @example
 * const instance = new Customer();
 * getInstanceName(instance); // {}
 * @param instance
 */
// export function getInstanceName(instance: Object): string {
//   return (Reflect as any).getMetadata(modelSchemaKey, instance.constructor);
// }
