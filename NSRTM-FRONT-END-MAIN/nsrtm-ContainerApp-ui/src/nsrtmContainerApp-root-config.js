import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

// applications.forEach(registerApplication);
// layoutEngine.activate();
// start();

registerApplication({
  name: "@nsrtmContainerApp/nsrtm-header",
  app: () => System.import("@nsrtmContainerApp/nsrtm-header"),
  activeWhen: ["/"],
  customProps: { domElement: document.getElementById("header-container") },
});

registerApplication({
  name: "@nsrtmContainerApp/nsrtm-main",
  app: () => System.import("@nsrtmContainerApp/nsrtm-main"),
  activeWhen: ["/"],
  customProps: { domElement: document.getElementById("sidenav-container") },
});

registerApplication({
  name: "@nsrtmContainerApp/nsrtm-rate-payer",
  app: () => System.import("@nsrtmContainerApp/nsrtm-rate-payer"),
  activeWhen: ["/nsrtm-rate-payer-app"],
  customProps: { domElement: document.getElementById("main-container") },
});

registerApplication({
  name: "@nsrtmContainerApp/nsrtm-caja",
  app: () => System.import("@nsrtmContainerApp/nsrtm-caja"),
  activeWhen: ["/nsrtm-caja-ui"],
  customProps: { domElement: document.getElementById("main-caja") },
});


start({
  urlRerouteOnly: true,
});
