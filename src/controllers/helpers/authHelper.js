import User from "../../models/User";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
const { Strategy: LocalStrategy } = passportLocal;

export default function (passport) {
  passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password"}, (email, password, done) => {
    return User.findOne({ email: email})
      .then((user) => {
        if (user) {
          // check user credentials //
          return bcrypt.compare(password, user.password)
            .then((same) => {
              if (same) {
                return done(null, {
                  _id: user._id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  phoneNumber: user.phoneNumber
                });
              } else {
                return done(null, false);
              }
            })
            .catch((error) => {
              return done(error, false);
            });
        } else {
          return done(null, false);
        }
      })
      .catch((error) => {
        return done(error, false);
      });
  }));
  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    return User.findById(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error, false);
      });
  });
}