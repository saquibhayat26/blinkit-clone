import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as Models from "./../models/index.js";
import { dark, light, noSidebar } from "@adminjs/themes";
import {
  authenticateAdmin,
  COOKIE_PASSWORD,
  PRODUCTION,
  sessionStore,
} from "./config.js";

AdminJS.registerAdapter(AdminJSMongoose);

export const adminjsOptions = new AdminJS({
  resources: [
    {
      resource: Models.Customer,
      options: {
        listProperties: ["phone", "role", "isActivated"],
        filterProperties: ["phone", "role"],
      },
    },
    {
      resource: Models.DeliveryPartner,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Admin,
      options: {
        listProperties: ["email", "role", "isActivated"],
        filterProperties: ["email", "role"],
      },
    },
    {
      resource: Models.Branch,
    },
  ],

  branding: {
    companyName: "Blinkit-Clone",
    withMadeWithLove: false,
    favicon: "",
  },
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  rootPath: "/admin",
});

export const buildAdminJSRouter = async (app: any) => {
  await AdminJSFastify.buildAuthenticatedRouter(
    adminjsOptions,
    {
      authenticate: async (email: string, password: string) => {
        return authenticateAdmin(email, password);
      },
      cookiePassword: COOKIE_PASSWORD,
      cookieName: "adminjs",
    },
    app,
    {
      store: sessionStore,
      saveUninitialized: true,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: PRODUCTION,
        secure: PRODUCTION,
      },
    }
  );
};
