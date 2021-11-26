import { bindable, BindingMode } from "aurelia";
import { Utility } from "../../utilities/common";
import { tooltip } from "bootstrap";
import { ObjectUtility } from "../../utilities/object-utility";

const clamp = require("text-overflow-clamp");
const bootstrap = require("bootstrap");

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
  @bindable({ primary: true, mode: BindingMode.oneTime }) lines: number = 3;
  @bindable({ mode: BindingMode.oneTime }) left: boolean = false;
  @bindable({ mode: BindingMode.oneTime }) tooltipOptions: object = null;
  @bindable({ mode: BindingMode.toView }) tooltipText = "";

  private observer: MutationObserver = null;
  private tooltip: tooltip = null;

  constructor(private readonly element: HTMLElement) {
    if (Utility.isNullOrEmpty(this.tooltipText)) {
      this.textContentChanged();

      // Keep the HTML textContent and tooltip in sync
      if (window.MutationObserver) {
        this.observer = new window.MutationObserver(() => {
          this.textContentChanged();
        });

        this.observer.observe(this.element, {
          characterData: true,
          childList: true,
          subtree: true,
        });
      }
    }
  }

  private getOptions() {
    return ObjectUtility.joinIntoNew(this.tooltipOptions, {
      title: this.tooltipText,
    });
  }

  private tooltipTextChanged() {
    // Destroy the original tooltip
    this.tooltip?.dispose();

    // Create another one (if necessary) with the updated contents
    if (this.tooltipText) {
      this.tooltip = new bootstrap.Tooltip(this.element, this.getOptions());
    }
  }

  private textContentChanged() {
    const offsetWidth = (this.element as HTMLElement).offsetWidth;
    const scrollWidth = this.element.scrollWidth;
    const offsetHeight = (this.element as HTMLElement).offsetHeight;
    const scrollHeight = this.element.scrollHeight;

    // this.tooltipText = this.element.textContent.trim();

    // console.log(offsetWidth, scrollWidth);
    // console.log(offsetHeight, scrollHeight);

    // Only show the tooltip if the ellipsis is ellipsing
    this.tooltipText =
      offsetWidth !== scrollWidth || offsetHeight !== scrollHeight
        ? this.element.textContent.trim()
        : "";
  }

  private attached() {
    clamp(this.element, this.lines);
  }

  private detached() {
    this.observer?.disconnect();
    this.observer = null;

    this.tooltip?.dispose();
    this.tooltip = null;
  }
}
