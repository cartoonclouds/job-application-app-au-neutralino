import { bindable, BindingMode } from "aurelia";
import { tooltip } from "bootstrap";
import { ObjectUtility } from "../../utilities/object-utility";

const bootstrap = require("bootstrap");

type TooltipTriggerEvents = "click" | "hover" | "focus" | "manual";
interface ITooltipDelayOptions {
  show?: number;
  hide?: number;
}

// @url https://stackoverflow.com/a/49725198
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
type TooltipDelay = RequireAtLeastOne<ITooltipDelayOptions, "show" | "hide">;
type TooltipPlacement = "auto" | "top" | "bottom" | "left" | "right";
type TooltipOffsetsFunction = (
  popper: object,
  reference: object,
  placement: string
) => [number, number];
/* Popperjs OffsetsFunction Typescript definitions *
type Rect = {
  width: number;
  height: number;
  x: number;
  y: number;
};
type AutoPlacement = "auto" | "auto-start" | "auto-end";
type BasePlacement = "top" | "bottom" | "right" | "left";
type VariationPlacement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "right-start"
  | "right-end"
  | "left-start"
  | "left-end";
type Placement = AutoPlacement | BasePlacement | VariationPlacement;
type TooltipOffsetsFunction = ({
  popper: Rect,
  reference: Rect,
  placement: Placement,
}) => [number, number];
/**
type Options = {|
  placement: Placement, // "bottom"
  modifiers: Array<$Shape<Modifier<any>>>, // []
  strategy: PositioningStrategy, // "absolute",
  onFirstUpdate?: ($Shape<State>) => void, // undefined
|};

type Placement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';
type Strategy = 'absolute' | 'fixed';
/*****/

interface ITooltipOptions {
  animation: boolean;
  template: string;
  title: string | Element | (() => string);
  trigger: TooltipTriggerEvents;
  delay: number | TooltipDelay;
  html: boolean;
  selector: string | boolean;
  placement:
    | TooltipPlacement
    | ((tooltipElement: Element, triggeringElement: Element) => void);
  offset: [number, number] | string | TooltipOffsetsFunction;
  container: string | Element | boolean;
  fallbackPlacements: Array<Omit<TooltipPlacement, "auto">>;
  boundary: string | Element;
  customClass: string | (() => string);
  sanitize: boolean;
  sanitizeFn: null | ((unsafeHtml: string) => string);
  allowList: { [tag: string]: [] };
  popperConfig: null | object | (({}) => {});
}

class DefaultTooltipOptions {
  html: boolean = true;

  constructor(options?: DefaultTooltipOptions) {
    if (options) {
      this.html = options.html ?? this.html;
    }
  }
}

/**
 * Tooltip Attribute
 *
 * @url https://getbootstrap.com/docs/5.0/components/tooltips/
 * @todo Look at BootstrapTooltip
 */
export class TooltipCustomAttribute {
  @bindable({ primary: true, mode: BindingMode.toView }) content: string = "";
  @bindable({ mode: BindingMode.toView })
  options: DefaultTooltipOptions = new DefaultTooltipOptions();

  private tooltip: tooltip = null;

  constructor(private readonly element: HTMLElement) {}

  public attached() {
    this.initTooltip();
  }

  public detached() {
    this.tooltip?.dispose();
    this.tooltip = null;
  }

  private initTooltip() {
    this.tooltip?.dispose();

    if (this.content) {
      this.tooltip = new bootstrap.Tooltip(this.element, this.getOptions());
    }
  }

  private getOptions() {
    return ObjectUtility.joinIntoNew(this.options, { title: this.content });
  }

  public propertyChanged(name, newValue, oldValue) {
    this.initTooltip();
  }
}
