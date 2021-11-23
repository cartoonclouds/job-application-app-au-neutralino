import { bindable, BindingMode, PLATFORM } from "aurelia";
import { Utility } from "../../utilities/common";
import { observable } from "@aurelia/runtime";

enum EllipsisPosition {
  START = "start",
  MIDDLE = "middle",
  END = "end",
}

/**
 * Line Clamp Attribute
 *
 * Truncates text to a certain number of lines, providing a tooltip.
 * @url https://api.jqueryui.com/tooltip/
 */
export class EllipsisCustomAttribute {
  @bindable({ primary: true, mode: BindingMode.toView }) lines: number = 1;
  @bindable({ mode: BindingMode.toView }) position: EllipsisPosition =
    EllipsisPosition.END;
  @bindable({ mode: BindingMode.toView }) @observable tooltipText: string = "";
  @bindable({ mode: BindingMode.toView }) tooltip: object = {};

  private observer: MutationObserver = null;

  constructor(private readonly element: HTMLElement) {}

  public binding() {
    console.log("binding");

    // Use the element textContent if no tooltipTetx is supplied
    if (Utility.isNullOrEmpty(this.tooltipText)) {
      // Keep the HTML textContent and tooltipText in sync
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

    $(this.element).tooltip({
      ...this.tooltip,
      content: this.tooltipText,
    });
  }

  public detached() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private tooltipTextChanged() {
    // $(this.element).tooltip("destroy");

    // if (this.tooltipText) {
    $(this.element).tooltip("option", {
      ...this.tooltip,
      content: this.tooltipText,
    });
    // }
  }

  private textContentChanged() {
    PLATFORM.domWriteQueue.queueTask(() => {
      const offsetWidth = this.element.offsetWidth;
      const scrollWidth = this.element.scrollWidth;

      const offsetHeight = this.element.offsetHeight;
      const scrollHeight = this.element.scrollHeight;

      // Only show the tooltip if the ellipsis is ellipsing
      // this.tooltipText =
      //   offsetWidth !== scrollWidth || offsetHeight !== scrollHeight
      //     ? this.element.textContent.trim()
      //     : "";

      this.tooltipText = this.element.textContent.trim();
    });
  }
}
