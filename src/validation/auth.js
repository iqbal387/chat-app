const validator = require("validator");
const jwt = require("jsonwebtoken");

const { secretOrKey } = require("../config/keys");
const isEmpty = require("./isEmpty");

const registerValidation = ({ email, fullName, password, confirmPassword }) => {
  const errors = {};

  if (!validator.isEmail(email)) {
    errors.email = "Email tidak valid";
  }

  if (!validator.isLength(email, { min: 1, max: 60 })) {
    errors.email = "Email maksimal 60 karakter";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email tidak boleh kosong";
  }

  if (!validator.isLength(fullName, { min: 2, max: 20 })) {
    errors.fullName = "Nama Depan harus 2 sampai 60 karakter";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password tidak boleh kosong";
  }

  if (validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm Password tidak boleh kosong";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Confirm Password tidak sesuai";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const loginValidation = ({ email, password }) => {
  const errors = {};

  if (!validator.isEmail(email)) {
    errors.email = "Email tidak valid";
  }

  if (validator.isEmpty(email)) {
    errors.email = "Email tidak boleh kosong";
  }

  if (validator.isEmpty(password)) {
    errors.password = "Password tidak boleh kosong";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const isTokenValid = (token) => {
  if (!token) return false;

  const user = jwt.verify(token, secretOrKey);

  return Boolean(user?.id);
};

module.exports = {
  registerValidation,
  loginValidation,
  isTokenValid,
};
