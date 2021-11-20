// import "reflect-metadata";

// export const classAttributeKey = Symbol("classAttribute");

// export function schema(instance, propertyKey?, type?) {
//   console.log(instance, propertyKey, type);
//   return Reflect.defineMetadata(
//     "custom:annotation",
//     Number,
//     Example.prototype,
//     "property"
//   );
// }

// /**
//  * @example
//  * const type = Customer;
//  * getClassSchema(type); // {}
//  * @param type
//  */
// export function getClassSchema(instance: Object): string {
//   return (Reflect as any).getMetadata(classAttributeKey, instance.constructor);
// }

// /**
//  * @example
//  * const instance = new Customer();
//  * getInstanceName(instance); // {}
//  * @param instance
//  */
// // export function getInstanceName(instance: Object): string {
// //   return (Reflect as any).getMetadata(classSchemaKey, instance.constructor);
// // }
