const authModel = require("../models/user");

const signUp = async (request) => {
  console.log("Inside signUp Service");
  const createdUser = await authModel.createUser(request);

  return createdUser;
};

const login = async (request) => {
  const user = await authModel.getUser(request.username);
  if (!user) {
    throw new Error("Invalid Username/Password");
  }
  if (user.password !== request.password) {
    throw new Error("Invalid Username/Password");
  }
  return user._id;
};

module.exports = {
  signUp,
  login,
};
