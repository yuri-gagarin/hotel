import { validateUser } from "./helpers/validationHelpers";
import User from "../models/User";
import bcrypt from "bcrypt";
// validators //
import { validateLoginForm } from "./helpers/validationHelpers";
const SALT_ROUNDS = 10;
/**
 * Hashes a password with bcrypt.
 * @param {string} password A plain text to be hashed.
 * @param {number} saltRounds Salt rounds for bcrypt.
 * @returns {Promise<string>} A Promise which resolves to a password hash or rejects with error.
 */
const hashPassword = (password, saltRounds) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (error, salt) => {
      if (error) reject(error);
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) reject(error);
        resolve(hash);
      });
    });
  });
};

export default {
  registerUser: (req, res) => {
    const userData = req.body;
    // validate data bofore proceeding //
    const { errors, isValid } = validateUser(userData);
    if (!isValid) {
      return res.status(400).json({
        message: "Registration Error",
        error: errors
      });
    } else {
      // hash a password first //
      return hashPassword(userData.password, SALT_ROUNDS)
        .then((hashedPassword) => {
          return User.create({ ...userData, password: hashedPassword });
        })
        .then((user) => {
          return res.status(200).json({
            message: "New user registered",
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Ooops something went wrong on our end...",
            error: error
          });
        });
    }
  },  
  deleteUser: (req, res) => {
    const userId = req.params.userId;
    // make sure to include role validation //
    return User.findByIdAndDelete(userId)
      .then((deletedUser) => {
        if (deletedUser) {
          return res.json({
            message: "Deleted a user",
            user: {
              firstName: deletedUser.firstName,
              lastName: deletedUser.lastName
            }
          });
        } else {
          // no user to delete or incorrect userId //
          return Promise.reject(new Error("Can't seem to find a user to delete"));
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Something went wrong on our end...",
          error: error
        });
      });
  },
  loginUser: (req, res) => {
    console.log("valled")
    const user = req.user;
    const { errors, isValid } = validateLoginForm(req.body);
    if (!isValid) {
      return Promise.resolve()
        .then(() => {
          res.status(400).json({
            responseMsg: "Login Error",
            error: errors
          });
        });
    }
    console.log("valid");
    if (user) {
      return res.status(200).json({
        responseMsg: "Successful Login",
        admin: true,
        user: user
      });
    } else {
      return res.json({
        responseMsg: "no user"
      });
    }
  },
  logoutUser: (req, res) => {
    req.logout();
    return res.status(200).json({
      message: "Successfully logged out"
    });
  },
}