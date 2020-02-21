import { validateUser } from "./helpers/validationHelpers";
import User from "../models/User";
import bcrypt from "bcrypt";
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
      return hashPassword(password, SALT_ROUNDS)
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

  },
  logoutUser: (req, res) => {

  },
  testLogin: (req, res) => {
    res.json({
      message: "A ok"
    })
  }
}