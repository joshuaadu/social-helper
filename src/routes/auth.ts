import { Router } from "express";
import * as passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import resolvers from "../graphql/resolvers";
import { User, usersCollection } from "../database/user";

passport.serializeUser((user, done) => {
  done(null, (user as User)._id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser", id);
  const existingUser = await resolvers.user({ id: id });
  done(null, existingUser);
});

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const user = await usersCollection.findOne({ id: profile.id });
      if (user) {
        return cb(null, user);
      }

      const newUser = {
        id: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
        provider: "google",
        providerId: profile.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        accessToken,
      };
      const result = usersCollection.insertOne(newUser);
      if (result) {
        const existingUser = await usersCollection.findOne({ id: profile.id });
        return cb(null, existingUser);
      } else {
        return cb(null, null);
      }
    }
  )
);

const router = Router();

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    res.redirect("/home");
  } else {
    next();
  }
};

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/auth/google",
  })
);

router.get(
  "/google",
  isLoggedIn,
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    res.send("google auth");
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      next(err);
    }
    res.redirect("/");
  });
});

router.get("twitter/redirect", (req, res) => {
  res.send("twitter redirect");
});
router.get("twitter", isLoggedIn, (req, res) => {
  res.send("twitter auth");
});

router.get("facebook", isLoggedIn, (req, res) => {
  res.send("facebook auth");
});

router.get("facebook/redirect", (req, res) => {
  res.send("facebook redirect");
});

export const authCheck = (req, res, next) => {
  //   console.log("authCheck", req.user, req.isAuthenticated());
  if (!req.user) {
    res.redirect("/auth/google");
  } else {
    next();
  }
};

export default router;
