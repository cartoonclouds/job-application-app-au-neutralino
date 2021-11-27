import moment from "moment";
import { UUIDService } from "../services/UUIDService";

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

  protected randomDate(start?, end?) {
    if (!start || !end) {
      return moment(
        new Date(+new Date() - Math.floor(Math.random() * 10000000000))
      );
    }

    return moment(
      new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      )
    );
  }

  protected generateStandardProperties() {
    const createdAt = this.randomDate();

    return {
      id: UUIDService.generate(),
      createdAt: createdAt,
      updatedAt: createdAt.add(this.randomDate().toObject()),
    };
  }
}
