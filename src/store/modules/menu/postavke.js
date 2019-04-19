import lazyLoading from "./lazyLoading";

export default {
  name: "opste-postavke",
  meta: {
    expanded: false,
    title: "Opšte postavke",
    iconClass: "vuestic-icon vuestic-icon-settings"
  },

  children: [
    {
      name: "lokacije",
      path: "/postavke/lokacije",
      component: lazyLoading("postavke/lokacije/Lokacije"),
      meta: {
        title: "Lokacije",
        requiredAuth: true
      }
    },
    {
      name: "doktori",
      path: "/postavke/doktori",
      component: lazyLoading("postavke/doktori/Doktori"),
      meta: {
        title: "Doktori",
        requiredAuth: true
      }
    },
    {
      name: "mjesta2",
      path: "/postavke/mjesta2",
      component: lazyLoading("postavke/mjesta/Mjesta"),
      meta: {
        title: "Mjesta",
        requiredAuth: true
      }
    },
    {
      name: "sekcije",
      path: "/postavke/sekcije",
      component: lazyLoading("postavke/sekcije/Sekcije"),
      meta: {
        title: "Sekcije",
        requiredAuth: true
      }
    },
    {
      name: "generalno",
      path: "/postavke/generalno",
      component: lazyLoading("postavke/generalno/Generalno"),
      meta: {
        title: "Generalno",
        requiredAuth: true
      }
    },
    {
      name: "paneli",
      path: "/postavke/paneli",
      component: lazyLoading("postavke/paneli/Paneli"),
      meta: {
        title: "Paneli",
        requiredAuth: true
      }
    },
    {
      name: "sajtovi",
      path: "/postavke/sites",
      component: lazyLoading("postavke/sites/Sites"),
      meta: {
        title: "Sites",
        requiredAuth: true
      }
    }
  ]
};
