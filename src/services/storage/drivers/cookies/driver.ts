import { singleton } from "aurelia";
import { Utility } from "../../../../utilities/common";

export interface OptionsInterface {
  expires?: Date;
  expiry?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: string;
}

/**
 * A storage driver for browser cookies.
 */
@singleton
export class CookieDriver {
  /**
   *
   * Get a cookie by its name
   */
  public static get(name: string) {
    const cookies: any = this.getAll();

    return cookies && cookies[name] ? cookies[name] : null;
  }

  /**
   * Set a cookie
   */
  public static set(
    name: string,
    value: string | object,
    options: OptionsInterface
  ) {
    if (Utility.isObject(value)) {
      value = CookieDriver.parseToString(value);
    }

    let str = `${this.encode(name)}=${this.encode(value)}`;

    if (value === null) {
      options.expiry = -1;
    }

    /**
     * Expiry date in hours
     */
    if (options?.expiry && options.expiry >= 0 && !options.expires) {
      let expires = new Date();

      expires.setHours(expires.getHours() + options.expiry);
      options.expires = expires;
    }

    if (options?.path) {
      str += `; path=${options.path}`;
    }

    if (options?.domain) {
      str += `; domain=${options.domain}`;
    }

    if (options?.expires) {
      str += `; expires=${options.expires.toUTCString()}`;
    }

    if (options?.secure) {
      str += "; secure";
    }

    if (options?.sameSite) {
      str += `; samesite=${options.sameSite}`;
    }

    document.cookie = str;
  }

  /**
   * Deletes a cookie by setting its expiry date in the past
   */
  public static remove(name: string, domain?: string, path?: string) {
    let cookieString = `${name} =;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    if (path) {
      cookieString += `; path=${path}`;
    }

    document.cookie = cookieString;
  }

  public static removeAll() {
    const cookies = this.getAll();

    Object.keys(cookies).forEach((key) => this.remove(key));
  }

  /**
   * Get all set cookies and return an array
   */
  public static getAll() {
    return this.parseToObject(document.cookie);
  }

  private static parseToString(obj: object) {
    return JSON.stringify(obj);
  }

  private static parseToObject(str: string) {
    let obj: any = {};
    let pairs: any = str.split(/ *; */);
    let pair: any;

    if (pairs[0] === "") {
      return obj;
    }

    for (let i = 0; i < pairs.length; ++i) {
      pair = pairs[i].split("=");
      obj[this.decode(pair[0])] = this.decode(pair[1]);
    }

    return obj;
  }

  private static encode(value: string) {
    try {
      return encodeURIComponent(value);
    } catch (e) {
      return null;
    }
  }

  private static decode(value: string): any {
    try {
      return decodeURIComponent(value);
    } catch (e) {
      return null;
    }
  }
}
