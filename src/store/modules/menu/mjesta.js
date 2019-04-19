import lazyLoading from "./lazyLoading";

export default {
  name: "mjesta",
  path: "/postavke/mjesta",
  component: lazyLoading("postavke/mjesta/Mjesta"),
  meta: {
    default: false,
    expanded: false,
    title: "Mjesta",
    iconClass: "fa fa-map-marker",
    requiredAuth: true
  }
};
