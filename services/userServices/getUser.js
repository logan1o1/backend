const User = require("../../models/User");

class GetUserServices {
  async getByEmail(email) {
    return await User.findOne({ email: email });
  }
  async getById(id) {
    return await User.findById(id);
  }
}

module.exports = new GetUserServices();
