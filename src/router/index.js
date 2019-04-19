import Vue from "vue";
import Router from "vue-router";

import menuModule from "vuex-store/modules/menu";
import lazyLoading from "./lazyLoading";
import { http } from "../../config/config.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: "*",
      redirect: { name: getDefaultRoute(menuModule.state.items).name }
    }
  ]
});
function generateRoutesFromMenu(menu = [], routes = []) {
  var predracun = {
    path: "/rezultati/predracun/:id",
    component: lazyLoading("rezultati/verifikacija/predracun"),
    props: true,
    meta: {
      title: "predracun",
      requiredAuth: true
    }
  };
  var racRuta = {
    path: "/uzorci/racuni/racun/:id",
    component: lazyLoading("uzorci/racuni/racun"),
    props: true,
    meta: {
      title: "predRacun",
      requiredAuth: true
    }
  };
  var samplesEntry = {
    path: "/samples/entry/:id",
    component: lazyLoading("samples/entry/SamplesEntry"),
    props: true,
    meta: {
      title: "samplesEntry",
      requiredAuth: true
    }
  };
  var detRuta = {
    path: "/uzorci/pregled/:sekcija/:id",
    component: lazyLoading("uzorci/detalji"),
    props: true,
    meta: {
      title: "pregledDetalji",
      requiredAuth: true
    }
  };
  var urediRuta = {
    path: "/uzorci/uredi/:sekcija/:id",
    component: lazyLoading("uzorci/uredi"),
    props: true,
    meta: {
      title: "uzorakUredi",
      requiredAuth: true
    }
  };
  var nalRuta = {
    path: "/nalazi/pregled/:id",
    component: lazyLoading("nalazi/pregled/nalaz"),
    props: true,
    meta: {
      title: "nalazPregled",
      requiredAuth: true
    }
  };
  var nalOutbox = {
    path: "/nalazi/outbox/:id",
    component: lazyLoading("nalazi/outbox/nalaz"),
    props: true,
    meta: {
      title: "nalazOutbox",
      requiredAuth: true
    }
  };
  var nalveRuta = {
    path: "/nalazi/verifikacija/:id",
    component: lazyLoading("nalazi/verifikacija/nalaz"),
    props: true,
    meta: {
      title: "nalazVerifikacija",
      requiredAuth: true
    }
  };
  var printRuta = {
    path: "/rezultati/pregled/nalaz/:sekcija/:id",
    component: lazyLoading("nalaz/nalaz"),
    props: true,
    meta: {
      title: "printanjeNalaza",
      requiredAuth: true
    }
  };
  var rezRuta = {
    path: "/rezultati/pregled/:sekcija/:id",
    component: lazyLoading("rezultati/pregled/detalji"),
    props: true,
    meta: {
      title: "rezDetalji",
      requiredAuth: true
    }
  };
  var contrDet = {
    path: "/kontrole/pregled/:id",
    component: lazyLoading("kontrole/pregled/detalji"),
    props: true,
    meta: {
      title: "contrDetalji",
      requiredAuth: true
    }
  };
  var patientDet = {
    path: "/pacijenti/detalji/:id",
    component: lazyLoading("pacijenti/pregled/detalji"),
    props: true,
    meta: {
      title: "patientDetalji",
      requiredAuth: true
    }
  };
  var orezRuta = {
    path: "/rezultati/verifikacija/:patient/:id",
    component: lazyLoading("rezultati/verifikacija/detalji"),
    props: true,
    meta: {
      title: "orezDetalji",
      requiredAuth: true
    }
  };
  var authLogin = {
    path: "/auth/login",
    component: lazyLoading("auth/login/Login"),
    meta: {
      default: false,
      title: "login",
      requiredAuth: false
    }
  };
  var authSignup = {
    path: "/postavke/newuser",
    component: lazyLoading("postavke/user/newUser"),
    meta: {
      default: false,
      title: "signUp",
      requiredAuth: false
    }
  };
  var avatarAdd = {
    path: "/postavke/avatar",
    component: lazyLoading("postavke/user/avatar"),
    meta: {
      default: false,
      title: "avatar",
      requiredAuth: false
    }
  };
  var chPwd = {
    path: "/postavke/chpwd",
    component: lazyLoading("postavke/user/chpwd"),
    meta: {
      default: false,
      title: "chpwd",
      requiredAuth: false
    }
  };
  var editUser = {
    path: "/postavke/edit",
    component: lazyLoading("postavke/user/edit"),
    meta: {
      default: false,
      title: "edit",
      requiredAuth: false
    }
  };
  var mojePostavke = {
    path: "/postavke/settings",
    component: lazyLoading("postavke/user/settings"),
    meta: {
      default: false,
      title: "edit",
      requiredAuth: false
    }
  };
  var acme = {
    path: "/.well-known/acme-challenge/:id",
    component: lazyLoading("/postavke/user/chpwd"),
    props: true,
    meta: {
      title: "acme",
      requiredAuth: true
    }
  };

  // Obrada, Salko Islamović (13.03.2019)
  var obrada = {
    path: "/rezultati/obrada/:patient/:id",
    component: lazyLoading("obrada/Obrada"),
    props: true,
    meta: {
      title: "obrada",
      requiredAuth: true
    }
  };
  var racun = {
    path: "/obrada/racun/:id",
    component: lazyLoading("obrada/racun"),
    props: true,
    meta: {
      title: "racun",
      requiredAuth: true
    }
  };
  // End of Obrada

  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i];
    if (item.path) {
      routes.push(item);
    }
    if (item.children) {
      generateRoutesFromMenu(item.children, routes);
    }
  }

  routes.push(samplesEntry);
  routes.push(printRuta);
  routes.push(detRuta);
  routes.push(rezRuta);
  routes.push(orezRuta);
  routes.push(authLogin);
  routes.push(authSignup);
  routes.push(chPwd);
  routes.push(editUser);
  routes.push(contrDet);
  routes.push(nalRuta);
  routes.push(patientDet);
  routes.push(acme);
  routes.push(nalveRuta);
  routes.push(urediRuta);
  routes.push(avatarAdd);
  routes.push(nalOutbox);
  routes.push(mojePostavke);
  routes.push(racRuta);
  routes.push(predracun);

  // Obrada, Salko Islamović (13.03.2019)
  routes.push(obrada);
  routes.push(racun);
  // End of Obrada

  return routes;
}

function getDefaultRoute(menu = []) {
  let defaultRoute;

  menu.forEach(item => {
    if (item.meta.default) {
      defaultRoute = item;
    } else if (item.children) {
      let defaultChild = item.children.find(i => i.meta.default);
      defaultRoute = defaultChild || defaultRoute;
    }
  });

  return defaultRoute;
}

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
  } else {
    if (to.path !== "/auth/login") {
      if (to.path.indexOf("acme-challenge") !== -1) {
        http.get(to.path, {}).then(res => {
          // console.log(res.data)
        });
        // router.push('/.well-known/acme-challenge/' + id)
      } else {
        router.push("/auth/login");
      }
    } else {
      next();
    }
  }
});

export default router;
