const User = require("../../models/User");

class createUserServices {
  async createUser(data, hashedPassword) {
    const { userName, email } =
      data;

    return await User.create({
      username: userName,
      email,
      password: hashedPassword,
    });
  }
}

module.exports = new createUserServices();
