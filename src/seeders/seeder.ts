const faker = require("faker");

export abstract class Seeder<T> {
  constructor() {
    // sets locale to en_AU
    faker.locale = "en_AU";
  }

  public static run(count: number, withRelations: boolean = true) {
    const seeder = new (this as any)();

    return seeder.run(count, withRelations);
  }

  public static generate(withRelations: boolean = true) {
    return new (this as any)().generate(withRelations);
  }

  protected randomInt(from: number = 0, to: number = 100): number {
    return Math.floor(Math.random() * to) + from;
  }
}
