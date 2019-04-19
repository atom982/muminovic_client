import lazyLoading from "./lazyLoading";

export default {
  name: "obrada",
  path: "/obrada/pregled",
  component: lazyLoading("obrada/table"),
  meta: {
    default: false,
    expanded: false,
    title: "Obrada",
    iconClass: "vuestic-icon vuestic-icon-files",
    requiredAuth: true
  }
};
