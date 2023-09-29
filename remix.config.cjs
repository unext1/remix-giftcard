const { flatRoutes } = require('remix-flat-routes');

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  tailwind: true,
  postcss: true,
  routes(defineRoutes) {
    return flatRoutes('routes', defineRoutes);
  }
};
