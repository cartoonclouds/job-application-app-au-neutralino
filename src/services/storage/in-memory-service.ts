import { singleton } from "aurelia";
import { InMemoryDriver } from "./drivers/in-memory/driver";
import { Utility } from "../../utilities/common";
import { isObject } from "util";

/**
 * A storage service utilising the volitale memory.
 */
@singleton
export class InMemoryStorage implements Storage {
  public get length() {
    return InMemoryDriver.length;
  }

  public getItem(key: string): any {
    return InMemoryDriver.getItem(key);
  }

  public setItem(key: string, value: string): void {
    InMemoryDriver.setItem(key, value);
  }

  public removeItem(key: string): void {
    InMemoryDriver.removeItem(key);
  }

  public getAll(): any {
    return InMemoryDriver.getAll();
  }

  public clear() {
    InMemoryDriver.clear();
  }

  public key(index: number): string | null {
    // if (index >= InMemoryDriver.keys.length) {
    //   return null;
    // }
    // return InMemoryDriver.keys[index];
    return null;
  }
}
