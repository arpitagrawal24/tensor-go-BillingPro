// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:5173/dashboard",
//     failureRedirect: "http://localhost:5173/login",
//   })
// );

// router.get("/login/success", async (req, res) => {
//   if (req.user) {
//     res.status(200).json({ message: "User logged in", user: req.user });
//   } else {
//     res.status(400).json({ message: "Not authorized" });
//   }
// });

// router.get("/logout", (req, res, next) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("http://localhost:5173");
//   });
// });

// module.exports = router;
