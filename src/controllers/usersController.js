import bcrypt from "bcrypt";
import User from "../models/User";
// validators and helpers //
import { validateUser } from "./helpers/validationHelpers";

// check for correct params passed //
const checkForUserId = (res, userId) => {
  if (!userId) {
    return res.status(400).json({
      responseMsg: "User input error",
      error: new Error("Could not resolve user id")
    });
  }
}

export default {
  index: (req, res) => {
    return (
      User.find({}).sort({ createdAt: "desc" }).exec()
    )
    .then((users) => {
      return res.status(200).json({
        responseMsg: "Fetched all current users", users
      });
    })
    .catch((error) => {
      return res.status(500).json({
        responseMsg: "An error occured",
        error
      });
    });
  },

  getOne: (req, res) => {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        responseMsg: "An error occured",
        error: new Error("Could not resolve the User id to retreive")
      });
    }

    return (
      User.finOne({ _id: userId }).exec()
    )
    .then((user) => {
      if (user) {
        return res.status(200).json({
          responseMsg: "Fetched user", user
        })
      } else {
        return res.status(404).json({
          responseMsg: "Missing data",
          error: new Error("Could not find the user queried")
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        responseMsg: "A database error occured", error
      });
    });
  },

  create: (req, res) => {
    const { userData } = req.body;
    const saltRounds = 10;
    // validate new user input first //
    const { isValid, errors } = validateUser(userData, { newUser: true });
    const { password } = userData;

    if (!isValid) {
      return res.status(400).json({
        responseMsg: "User input error", error: new Error("Invalid input"), errors
      });
    }

    return (
      new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (error, salt) => {
          if (error) return reject(error);
          bcrypt.hash(password, salt, (error, hash) => {
            if (error) return reject(error);
            return resolve(hash);
          });
        });
      })
    )
    .then((passwordHash) => {
      return (
        User.create({ 
          ...userData, 
          password: passwordHash,
          role: "admin", 
          confirmed: false, 
          createdAt: new Date(Date.now()), 
          editedAt: new Date(Date.now()) 
        })
      );
    }).exec()
    .then((createdUser) => {
      return res.status(200).json({
        responseMsg: "Created a new user", createdUser
      });
    })
    .catch((error) => {
      return res.status(500).json({
        responseMsg: "User create error", error
      });
    })
  },

  edit: (req, res) => {
    const { userId } = req.params;
    const { userData } = req.body;

    if (!userId) {
      return res.status(400).json({
        responseMsg: "User input error",
        error: new Error("Could not resolve user id")
      });
    }

    const { isValid, errors } = validateUser(userData, { newUser: false });

    if (!isValid) {
      return res.status(400).json({
        responseMsg: "User input error",
        error: new Error("Invalid user update data"),
        errors
      });
    }

    const SALT_ROUNDS = 10;
    const { firstName, lastName, email, password, phoneNumber = "" } = userData;
    // by this time middleware should have checked correct credentials //
    // such as correct password or authorization level to change the user //
    return (
      new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_ROUNDS, (error, salt) => {
          if (error) return reject(error);
          bcrypt.hash(password, salt, (error, hash) => {
            if (error) return reject(error);
            return resolve(hash);
          });
        });
      })
    )
    .then((hashedPassword) => {
      return (
        User.findOneAndUpdate(
          { _id: userId },
          { $set: { firstName, lastName, email, password: hashedPassword, phoneNumber, editedAt: new Date(Date.now()) }},
          { new: true }
        )
        .exec()
      );
    })
    .then((updatedUser) => {
      return res.status(200).json({
        responseMsg: "User updated", updatedUser
      });
    })
    .catch((error) => {
      return res.status(500).json({
        responseMsg: "User update error",
        error
      });
    });
  },

  // assumes correct middleware already ran //
  editUserRole: (req, res) => {
    const { userId } = req.params;
    const { role = "admin" } = req.body;

    checkForUserId(res, userId);

    return (
      User.findOneAndUpdate({ _id: userId }, { $set: { role } }, { new: true }).exec()
    )
    .then((updatedUser) => {
      return res.status(200).json({
        responseMsg: "User updated", updatedUser
      });
    })
    .catch((error) => {
      return res.status(500).json({
        responseMsg: "User update error",
        error
      });
    });
  },
  // assumes all correct middleware already ran //
  editUserConfirmedStatus: (req, res) => {
    const { userId } = req.params;
    const { confirmed = false } = req.body;

    checkForUserId(res, userId);

    return (
      User.findOneAndUpdate({ _id: userId }, { $set: { confirmed } }, { new: true }).exec()
    )
    .then((updatedUser) => {
      return res.status(200).json({
        responseMsg: "User updated", updatedUser
      });
    })
    .catch((error) => {
      return res.status(500).json({
        responseMsg: "User update error",
        error
      });
    });
  },

  // assumes authenitcation already ran //
  // assumes role middleware already ran as only <owner> role should be able to delete users //
  delete: (req, res) => {
    const { userId } = req.params;
    // 
    checkForUserId(res, userId);

    return (
      User.findOneAndDelete({ _id: userId }).exec()
    )
    .then((deletedUser) => {
      if (deletedUser) {
        return res.status(200).json({
          responseMsg: "User updated", deletedUser
        });
      } else {
        return res.status(404).json({
          responseMsg: "User delete error", 
          error: new Error("User to to delete not found"),
          deletedUser: null
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        responseMsg: "User delete error",
        error
      });
    });
  }
}