/**
 * A base class for repository classes. Provides basic, useful methods.
 */
export class RepositoryBase {
  protected concatKey(...args: string[]): string {
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
