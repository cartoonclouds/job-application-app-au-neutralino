// Register plugins
import "bootstrap/dist/css/bootstrap.css";
import "select2/dist/css/select2.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "bootstrap";
import "jquery";
import "jquery-ui";
import "select2";

import Aurelia, { DI, Registration, IContainer, IResolver } from "aurelia";
import { App } from "./app";

// Register common components
import { SalaryRange } from "./components/common/salary-range/salary-range";
import { SelectDropdown } from "./components/common/select-dropdown/select-dropdown";

// Register value converters
import { NumberFormatValueConverter } from "./resources/value-converters/number-format";

// Register custom attributes
import { TooltipCustomAttribute } from "./resources/custom-attributes/tooltip";
import { EllipsisCustomAttribute } from "./resources/custom-attributes/ellipsis";
import { AnimateOnChangeCustomAttribute } from "./resources/custom-attributes/animate-on-change";

// Register services
import { SeederService } from "./services/SeederService";

const app = Aurelia.register(
  SalaryRange,
  SelectDropdown,
  NumberFormatValueConverter,
  TooltipCustomAttribute,
  EllipsisCustomAttribute,
  AnimateOnChangeCustomAttribute
).app(App);

const container = DI.createContainer();
container.register(Registration.singleton("SeederService", SeederService));

// Initialize native API communication. This is non-blocking
// use 'ready' event to run code on app load.
// Avoid calling API functions before init or after init.
Neutralino.init();

Neutralino.events.on("ready", () => {
  if (NL_OS != "Darwin") {
    // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    // Set tray handling
    // @ts-ignore
    if (NL_MODE != "window") {
      0;
      console.log("INFO: Tray menu is only available in the window mode.");
      return;
    }
    let tray = {
      icon: "/resources/icons/trayIcon.png",
      menuItems: [
        { id: "VERSION", text: "Get version" },
        { id: "SEP", text: "-" },
        { id: "QUIT", text: "Quit" },
      ],
    };
    Neutralino.os.setTray(tray);
  }

  app.start();
});

// @ts-ignore
Neutralino.events.on("trayMenuItemClicked", (event) => {
  switch (event.detail.id) {
    case "VERSION":
      Neutralino.os.showMessageBox(
        "Version information",
        `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`
      );
      break;
    case "QUIT":
      Neutralino.app.exit();
      break;
  }
});

// @ts-ignore
Neutralino.events.on("windowClose", () => {
  Neutralino.app.exit();
});
