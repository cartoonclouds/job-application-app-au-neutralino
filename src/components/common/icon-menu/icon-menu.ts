import { bindable, BindingMode, inject } from "aurelia";

const bootstrap = require("bootstrap");

export class MenuItem {
  public static type = "MenuItem";
  public type = MenuItem.type;

  public displayName: string;
  public icon: string = "";
  public class: string = "";
  public action = (d, event?) => true;
  public disabled: boolean = false;

  constructor(options?: Partial<MenuItem>) {
    if (options) {
      options = Object.assign(new MenuItem(), options);

      this.displayName = options.displayName;
      this.icon = options.icon;
      this.class = options.class;
      this.action = options.action;
      this.disabled = options.disabled;
    }
  }
}

export class MenuItemHeader extends MenuItem {
  public static type = "MenuItemHeader";
  public type = MenuItemHeader.type;

  constructor(options?: Partial<MenuItemHeader>) {
    super(options);
  }
}

export class MenuItemDivider {
  public static type = "MenuItemDivider";
  public type = MenuItemDivider.type;
}

@inject()
export class IconMenu {
  @bindable({ mode: BindingMode.toView }) public dataModel: any;
  @bindable({ mode: BindingMode.oneTime }) public items: (
    | MenuItem
    | MenuItemHeader
    | MenuItemDivider
  )[];
  @bindable({ mode: BindingMode.oneTime }) public direction:
    | "up"
    | "down"
    | "start"
    | "end" = "up";
  @bindable({ mode: BindingMode.oneTime }) public alignment: "start" | "end" =
    "end";
  @bindable({ mode: BindingMode.oneTime }) id = null;
  @bindable({ mode: BindingMode.oneTime }) button = false;
  @bindable({ mode: BindingMode.oneTime }) btnClass: string = "btn-secondary";
  @bindable({ mode: BindingMode.toView }) disabled: boolean = false;
  @bindable({ mode: BindingMode.toView }) caret: boolean = false;

  public static DIVIDER: MenuItemDivider = new MenuItemDivider();

  private menu = null;
  private static uniqueId = 0;

  constructor(private readonly element: HTMLElement) {}

  public attached() {
    this.initMenu();
  }

  public detached() {
    this.menu?.dispose();
    this.menu = null;
  }

  public binding() {
    if (this.id == null || this.id === "") {
      this.id = `dropdownMenu-${IconMenu.uniqueId}`;
      IconMenu.uniqueId++;
    }
  }

  private initMenu() {
    this.menu = new bootstrap.Dropdown(
      this.element.querySelector(".dropdown-toggle")
    );
  }

  public onItemSelect(menuItem, event) {
    if (!menuItem.action) {
      return;
    }

    return menuItem.action(this.dataModel, event);
  }

  public get dropDirection() {
    return `drop${this.direction}`;
  }

  public get dropAlignment() {
    return `dropdown-menu-${this.alignment}`;
  }
}
