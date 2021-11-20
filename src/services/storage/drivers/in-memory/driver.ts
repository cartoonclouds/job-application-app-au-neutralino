import { singleton } from "aurelia";

/**
 * A storage driver for in-memory (volatile).
 */
@singleton
export class InMemoryDriver {
  private static readonly storage = new Map<string, any>();

  public get length() {
    return InMemoryDriver.storage.size;
  }

  public static getItem(key: string): any {
    return InMemoryDriver.storage.get(key);
  }

  public static setItem(key: string, value: string): void {
    InMemoryDriver.storage.set(key, value);
  }

  public static removeItem(key: string): void {
    InMemoryDriver.storage.delete(key);
  }

  public static clear() {
    InMemoryDriver.storage.clear();
  }

  public static getAll(): Readonly<Map<string, any>> {
    return InMemoryDriver.storage;
  }
}
