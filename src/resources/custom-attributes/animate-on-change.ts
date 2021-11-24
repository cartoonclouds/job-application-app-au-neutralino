import { bindable, BindingMode } from "aurelia";
import "animate.css";

/**
 *
 * @url https://animate.style/#javascript
 */
export class AnimateOnChangeCustomAttribute {
  @bindable({ primary: true, mode: BindingMode.toView }) value;
  @bindable({ mode: BindingMode.oneTime }) duration;
  @bindable({ mode: BindingMode.oneTime }) delay;
  @bindable({ mode: BindingMode.oneTime }) repeat;

  constructor(private readonly element: HTMLElement) {}

  public attached() {
    // this.element.addEventListener("animationend", () => {
    //   // do something
    // });
    this.animate("bounceOutLeft");
  }

  private animate(animation: string, prefix = "animate__") {
    return new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;

      console.log("--animate-duration", this.duration);
      console.log("--animate-delay", this.delay);
      console.log("--animate-repeat", this.repeat);

      if (this.duration) {
        this.element.style.setProperty(
          "--animate-duration",
          `${this.duration}`
        );
      }

      if (this.delay) {
        this.element.style.setProperty("--animate-delay", `${this.delay}`);
      }

      if (this.repeat) {
        if (this.repeat === "infinite") {
          this.element.classList.add("animate__infinite");
        } else {
          this.element.style.setProperty("--animate-repeat", `${this.repeat}`);
        }
      }

      this.element.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      const handleAnimationEnd = (event) => {
        event.stopPropagation();
        this.element.classList.remove(
          `${prefix}animated`,
          animationName,
          "animate__infinite"
        );
        resolve("Animation ended");
      };

      this.element.addEventListener("animationend", handleAnimationEnd, {
        once: true,
      });
    });
  }

  public valueChanged() {
    this.animate("bounceOutLeft");
  }
}
