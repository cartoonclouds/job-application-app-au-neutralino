import { singleton } from "aurelia";
import { CookieDriver, OptionsInterface } from "./drivers/cookies/driver";

// https://github.com/aurelia-plugins/aurelia-plugins-cookies/blob/master/src/aurelia-plugins-cookies.js

/**
 * A "Storage" object wrapping the Cookies object
 */
@singleton
export class CookieStorage implements Storage {
  /** Dummy length */
  public length = -1;

  private options: OptionsInterface = {
    expiry: -11, // Expiry in hours, -1 for never expires or minimum 1 for one hour, 2 for two hours and so
    //path: "", // Specify cookie path
    //domain: "", // Domain restricted cookie
    //secure: false, // Either true or false
  };

  constructor(options?: OptionsInterface) {
    this.options = Object.assign(this.options, options);
  }

  public getItem(key: string): string {
    return CookieDriver.get(key);
  }

  public setItem(key: string, value: string): void {
    CookieDriver.set(key, value, this.options);
  }

  public removeItem(key: string): void {
    CookieDriver.remove(key, this.options.domain, this.options.path);
  }

  public clear() {
    CookieDriver.removeAll();
  }

  /** Dummy key function */
  public key(index: number): string {
    return this.getItem(`${index}`);
  }
}
