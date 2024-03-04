const hashService = require("../../services/hashService");
const tokenService = require("../../services/tokenService");
const getUser = require("../../services/userServices/getUser");
const refreshuser = require("../../services/userServices/userRefresh");

const loginController = {
  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(CustomErrorHandler.missingFields());
    }
    const hashedPassword = hashService.hashPassword(password);
    try {
      const user = await getUser.getByEmail(email);

      if (!user) {
        return next(CustomErrorHandler.notFound("Invalid Email or Password"));
      }

      if (hashedPassword !== user.password) {
        return next(CustomErrorHandler.notFound("Invalid Email or Password"));
      }

      const { accessToken, refreshToken } = tokenService.generateTokens({
        _id: user._id,
        approved: user.approved,
      });

      await refreshuser.storeRefreshToken(
        refreshToken,
        user._id
      );

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
        sameSite: "none",
        secure: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
        sameSite: "none",
        secure: true,
      });

      res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  },
};
module.exports = loginController;
