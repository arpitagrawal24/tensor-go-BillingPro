// const passport = require("passport");
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// const User = require("../models/User");

// const clientID = process.env.CLIENT_ID;
// const clientSecret = process.env.CLIENT_SECRET;

// passport.use(
//   new OAuth2Strategy(
//     {
//       clientID,
//       clientSecret,
//       callbackURL: "/auth/google/callback",
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//           user = new User({
//             googleId: profile.id,
//             displayName: profile.displayName,
//             email: profile.emails[0].value,
//             image: profile.photos[0].value,
//           });

//           await user.save();
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// module.exports = passport;
