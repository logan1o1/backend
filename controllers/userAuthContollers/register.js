const hashService = require("../../services/hashService");
const tokenService = require("../../services/tokenService");
const { createUser } = require("../../services/userServices/createUser");
const getUser = require("../../services/userServices/getUser");
const refreshuser = require("../../services/userServices/userRefresh");

const registerController = {
  async register(req, res, next) {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return next(CustomErrorHandler.missingFields());
    }

    try {
      const existUser = await getUser.getByEmail(email);
      if (existUser) {
        return next(
          CustomErrorHandler.alreadyExist("This email has been already taken")
        );
      }

      const hashedPassword = hashService.hashPassword(password);
      const user = await createUser(req.body, hashedPassword);
      const { accessToken, refreshToken } = tokenService.generateTokens({
        _id: user._id,
        approved: user.approved,
      });

      await refreshuser.storeRefreshToken(refreshToken, user._id);

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
module.exports = registerController;
