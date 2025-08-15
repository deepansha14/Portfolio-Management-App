// Centralized route definitions for the Portfolio Management App

const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  api: {
    auth: {
      login: "/api/auth/login",
      register: "/api/auth/register",
    },
  },
  static: "/static",
};

export default routes;
