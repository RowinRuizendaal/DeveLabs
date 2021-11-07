import Vue from "vue";
import VueRouter from "vue-router";
import Axios from "axios";

import Login from "../views/login/Login.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import Users from "../views/users/users.vue";
import Blogs from "../views/blogs/blogs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const Token = await validateToken(Vue.cookie.get("token"));

    if (!Vue.cookie.get("token") || !Token) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

const validateToken = async (token) => {
  const checkToken = Axios.get(
    `https://develabs.herokuapp.com/api/verify/${token}`
  )
    .then((response) => {
      if (response.status === 200) {
        return true;
      }
    })
    .catch((err) => {
      //   // Token is not valid from back-end
      err ? router.push("/") : true;
      return false;
    });
  return await checkToken;
};

export default router;
