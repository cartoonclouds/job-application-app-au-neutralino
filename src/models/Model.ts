import moment from "moment";
import _ from "underscore";
import { InMemoryStorage } from "../services/storage/in-memory-service";
import { UUIDService } from "../services/UUIDService";
import { ArrayUtility } from "../utilities/array-utility";
import { Utility } from "../utilities/common";
import { ObjectUtility } from "../utilities/object-utility";
import { SalaryRange } from "../components/common/salary-range/salary-range";
import { getModelSchema } from "../decorators/model-schema";
import { JobProfession } from "../enums/job-profession";
import { Address } from "./Address";
import { isObject } from "util";
import { PrimitiveTypesSerializations } from "./ModelPrimitiveCasts";

// https://stackoverflow.com/questions/14142071/typescript-and-field-initializers
// https://stackoverflow.com/questions/34698710/how-to-constraint-a-generic-type-to-have-new
// https://stackoverflow.com/questions/48438666/typescript-get-class-name-in-its-own-property-at-compile-time
// https://stackoverflow.com/questions/44196462/typescript-abstract-static

export abstract class Model<T> {
  protected static readonly storage = new InMemoryStorage();

  public static modelTypes = new Map<string, any>();

  constructor(attributes = {}) {
    Object.assign(this, attributes);
  }

  public id?: string;
  public createdAt: moment.Moment = moment();
  public updatedAt: moment.Moment = moment();
  public deletedAt?: moment.Moment;

  public get modelName() {
    return this.constructor.name.trim().toLowerCase();
  }

  public static get className() {
    return this.name.trim().toLowerCase();
  }

  /**
   * Saves the model to storage.
   */
  public save(): string {
    this.updatedAt = moment();
    this.id = this.id || UUIDService.generate();

    const serializedModel = this.serialize();

    const serializedModelString = Model.toJson(serializedModel);

    serializedModelString &&
      Model.storage.setItem(this.id, serializedModelString);

    return this.id;
  }

  /*
   * Finds model in storage.

   * @param id
   * @returns a new instance of the model found
   */
  public static find<M>(id: string): M | void {
    const serializedModelString = Model.storage.getItem(id);

    if (serializedModelString === undefined) {
      return undefined;
    }

    const model = new (this as any)();

    const modelData = JSON.parse(serializedModelString);

    model.unserialize(modelData);

    return model;
  }

  /**
   * Unserializes model data into a new instance.
   *
   * @param modelData
   * @returns
   */
  protected unserialize(modelData) {
    console.log(modelData);

    for (const attributeProps of modelData) {
      // skip schema entry if not defined on model instance
      if (!this.getSchemaFieldNames().includes(attributeProps.key)) {
        continue;
      }

      if (this.isClassCastable(attributeProps.type)) {
        const modelType = attributeProps.type.trim().toLowerCase();

        const newInstance = new (Model.modelTypes.get(modelType) as any)();

        this[attributeProps.key] = newInstance.unserialize(
          attributeProps.value
        );
      } else {
        this[attributeProps.key] = this.unserializePrimitive(
          attributeProps.type,
          attributeProps.value
        );
      }
    }

    return this;
  }

  /**
   * Serializes the model into a string storge format.
   *
   * @returns
   */
  protected serialize() {
    let serializedAttributes = [];

    for (const [key, type] of Object.entries(this.getSchema())) {
      // skip schema entry if not defined on model instance
      if (!this.hasOwnProperty(key)) {
        continue;
      }

      serializedAttributes.push({
        key,
        type,
        value: this.isClassSerializable(type)
          ? this[key].serialize()
          : this.serializePrimitive(type, this[key]),
      });
    }

    return serializedAttributes;
  }

  /**
   * Gets an object of all the attributes on the
   * model with their types defined by their schema.
   *
   * @returns
   */
  protected getSchema() {
    const modelAttributes = getModelSchema(this);
    const standardAttributes = {
      id: "string",
      createdAt: "moment.Moment",
      updatedAt: "moment.Moment",
      deletedAt: "moment.Moment",
    };

    return Object.assign({}, standardAttributes, modelAttributes);
  }

  protected getSchemaFieldNames() {
    return Object.keys(this.getSchema());
  }

  /**
   * Determine if the type is serializable using a custom class.
   *
   * @param  string type
   * @return bool
   */
  protected isClassSerializable(type) {
    return this.isClassCastable(type);
  }

  /**
   * Determine if the given type is castable using a custom class.
   *
   * @param  string  type
   * @return bool
   */
  protected isClassCastable(type: string) {
    type = type.trim().toLowerCase();

    if (Model.modelTypes.has(type)) {
      return true;
    }
    if (PrimitiveTypesSerializations.has(type)) {
      // console.log(`${type} not in primitives`);
      return false;
    }

    return false;
  }

  /**
   * Serializes primative types for storage as a string.
   *
   * @param castType
   * @param value
   * @returns
   */
  protected serializePrimitive(castType, value: any) {
    if (PrimitiveTypesSerializations.has(castType)) {
      return PrimitiveTypesSerializations.get(castType).serialize(value);
    }

    return Model.toJson(value);
  }

  /**
   * Cast an attribute to a primative Javascript type.
   *
   * @param castType attribute type
   * @param value value of the attribute
   */
  protected unserializePrimitive(castType: string, value: any) {
    if (PrimitiveTypesSerializations.has(castType)) {
      return PrimitiveTypesSerializations.get(castType).unserialize(value);
    }

    return Model.fromJson(value);
  }

  /**
   * Encode the given value as a JSON string.
   *
   * @param  mixed  value
   * @return string
   */
  public static toJson(value) {
    return JSON.stringify(value) || false;
  }

  /**
   * Decode the given JSON back into an array or object.
   *
   * @param value
   * @returns
   */
  public static fromJson(value: any) {
    try {
      return JSON.parse(value);
    } catch (e) {
      throw new TypeError("Unable to cast value to from JSON to object");
    }
  }

  /**
   * Encode the given infinity string back into an Infinity.
   */
  public static asInfinity(value: string) {
    return String(value).startsWith("-") ? -Infinity : Infinity;
  }

  protected static concatKey(...args: string[]): string {
    let concat = "";
    for (let i = 0; i < args.length; i++) {
      if (i === 0) {
        concat += args[i];
      } else {
        concat += `:${args[i]}`;
      }
    }

    return concat;
  }
}
