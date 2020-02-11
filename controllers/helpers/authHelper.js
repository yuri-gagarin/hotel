
import User from "../../models/User";
import passportJwt from "passport-jwt";
import jsonwebtoken from "jsonwebtoken";
const { ExtractJwt, Strategy: JwtStrategy } = passportJwt;

const SECRET_KEY = "secret";
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};
export const makeToken = () => {
  return new Promise((resolve, reject) => {

  })
}
export default function (passport) {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    return User.findById(jwtPayload.sub)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((error) => {
        return done(error, false);
      });
  }));
};