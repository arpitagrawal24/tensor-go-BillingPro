require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const axios = require("axios");
const connectDB = require("./db/conn");
const User = require("./models/User");

// Load environment variables
const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 3001;

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "YOUR SECRET KEY",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL + "/dashboard",
    failureRedirect: process.env.CLIENT_URL + "/login",
  })
);

app.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "User logged in", user: req.user });
  } else {
    res.status(400).json({ message: "Not authorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

// Invoice routes
app.use("/api/invoices", require("./routes/invoiceRoutes"));

// Zapier trigger endpoint
app.post("/api/trigger", async (req, res) => {
  try {
    const jsonDataArray = req.body.data;

    for (const jsonData of jsonDataArray) {
      const {
        clientEmail,
        paymentDue,
        id,
        total,
        status,
        clientName,
        createdAt,
      } = jsonData;
      console.log(
        clientEmail,
        paymentDue,
        id,
        total,
        status,
        clientName,
        createdAt
      );
      await triggerZapierAutomation(
        clientEmail,
        paymentDue,
        id,
        total,
        status,
        clientName,
        createdAt
      );
    }

    console.log("Zapier triggered successfully");
    res.json({ msg: "Data received and processed successfully" });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Function to trigger Zapier automation
const triggerZapierAutomation = async (
  clientEmail,
  paymentDue,
  id,
  total,
  status,
  clientName,
  createdAt
) => {
  try {
    const zapierWebhookUrl = process.env.WEBHOOK_URL;

    const payload = {
      data: {
        clientEmail,
        paymentDue,
        id,
        total,
        status,
        clientName,
        createdAt,
      },
    };

    await axios.post(zapierWebhookUrl, payload);

    console.log("Automation trigger sent to Zapier successfully");
  } catch (error) {
    console.error("Error triggering automation:", error);
  }
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
