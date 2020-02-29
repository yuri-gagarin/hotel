/**
 * Checks if data passed is an {Object} type and has properties, or a valid {string}
 * @param {Object|string} value - An object or string to be tested
 * @returns {boolean} Returns {true} if empty, {false} if not epmty or {string} length is > 0
 */
export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

/**
  * Validates user email input.
  * 
  * @param {string} user email
  * @return {boolean} result tested against regex
  */
 export const  emailValidator = (email) => {
   const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

   return regex.test(String(email).toLowerCase());
 };

/**
 * Validates new user data
 * @param {Object} userData - An {Object} containing data for new User model
 * @returns {Object} An {Object} which contains any errors and .isValid property
 */
export const validateUser = (userData) => {
  const errors = {};
  //validate user name and last name
  if (userData.firstName) {
    if (userData.firstName.length < 2) {
      errors.firstName = "Name should be at least 2 characters";
    }
  } else {
    errors.firstName = "Name field is required";
  }
  if (userData.lastName) {
    if (userData.lastName.length < 2) {
      errors.lastName = "Last name should be at least 2 characters";
    }
  } else {
    errors.lastName = "Last name field is required";
  }
  //validate user email
  if (userData.email) {
    if (!emailValidator(userData.email)) {
      errors.email = "Email is invalid";
    }
  } else {
    errors.email = "Email field is required";
  }
  //validate user password - make sure they match
  if (userData.password) {
    if (!userData.passwordConfirm) {
      errors.password = "You must confirm your password";
    }
    if (userData.password !== userData.passwordConfirm) {
      errors.password = "Passwords do not match";
    }
  } else {
    errors.password = "Password field is required";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};

export const validateContactPost = (postData) => {
  const errors = {};
  // validate contact post name //
  if (postData.name) {
    if (postData.name.length < 2) {
      errors.name = "Name should be at least 2 characters";
    }
  } else {
    errors.name = "Name field is required";
  }
  // validate contact post email //
  if (postData.email) {
    if (!emailValidator(postData.email)) {
      errors.email = "Invalid email";
    } 
  } else {
    errors.email = "We need your email to contact you";
  }
  // validate contact post content //
  if (postData.content) {
    if (postData.content.length <  10) {
      errors.content = "Give us at least 10 letters...";
    }
  } else {
    errors.content = "Content field is required.";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
