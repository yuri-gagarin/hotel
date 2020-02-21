import User from "../../models/User";
import passportLocal from "passport-local";
const { Strategy: LocalStrategy } = passportLocal;
export default function (passport) {
  passport.use(new LocalStrategy((username, password, done) => {
    if (username === "test" && password === "test") {
      return done(null, { username: username });
    } else {
      return done(null, false)
    }
  }));
}