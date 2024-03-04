const RefreshUser = require("../../models/RefreshUser");

class RefreshUserServices {
  async storeRefreshToken(token, userId) {
    await RefreshUser.create({
      token: token,
      userId: userId,
    });
  }
  async findRefreshToken(hospitaId, refreshToken) {
    const token = await RefreshUser.findOne({
      userId: userId,
      token: refreshToken,
    });
    return token;
  }
  async updateRefreshToken(hospitaId, refershToken) {
    return await RefreshUser.updateOne(
      { userId: userId },
      { token: refershToken }
    );
  }
  async removeToken(refreshToken) {
    return await RefreshUser.deleteOne({ token: refreshToken });
  }
}
module.exports = new RefreshUserServices();
