import { bindable, BindingMode } from "aurelia";

var clamp = require("text-overflow-clamp");

/**
 * Ellipsis Attribute
 *
 * @url https://css-tricks.com/line-clampin/
 * @url https://github.com/joshgillies/text-overflow-clamp
 * @url https://github.com/josephschmitt/Clamp.js/
 * @url https://github.com/ftlabs/ftellipsis
 * @url https://github.com/micjamking/Succinct
 */
export class EllipsisCustomAttribute {
  @bindable({ primary: true, mode: BindingMode.oneTime, set: (l) => l || 3 })
  lines: number;
  @bindable({ mode: BindingMode.oneTime }) left: boolean = false;

  constructor(private readonly element: HTMLElement) {}

  public attached() {
    clamp(this.element, this.lines);
  }
}
