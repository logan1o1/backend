const userRefresh = require("../../services/userServices/userRefresh");
const logoutController = {
  async logout(req, res, next) {
    const { refreshToken } = req.cookies;
    await userRefresh.removeToken(refreshToken);
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.status(200).json("logged out");
  },
};
module.exports = logoutController;
