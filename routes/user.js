import express from "express";
import passport from "passport";
import { saveRedirectUrl } from "../middleware.js";
import {
  logOut,
  login,
  loginForm,
  signUp,
  signUpForm,
} from "../controllers/users.js";

const router = express.Router({ mergeParams: true });

router.route("/signup").get(signUpForm).post(signUp);

router
  .route("/login")
  .get(loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/user/login",
      failureFlash: true,
    }),
    login
  );

router.get("/logout", logOut);

export default router;
