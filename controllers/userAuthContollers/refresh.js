const tokenService = require("../../services/tokenService");
const getUser = require("../../services/userServices/getUser");
const userRefresh = require("../../services/userServices/userRefresh");
const CustomErrorHandler = require("../../utils/CustomErrorHandler");

const refreshController = {
  async refresh(req, res, next) {
    try {
      const { refreshToken: refreshTokenFromCookie } = req.cookies;
      if (!refreshTokenFromCookie) {
        next(CustomErrorHandler.unAuthorized());
      }
      let userData = await tokenService.verifyRefreshToken(
        refreshTokenFromCookie
      );
      let token = await userRefresh.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return next(CustomErrorHandler.invalidToken());
      }

      const user = await getUser.getById(hospitalData._id);
      if (!user) {
        return next(
          CustomErrorHandler.notFound("No hospital exist with this id")
        );
      }

      const { refreshToken, accessToken } = tokenServices.generateTokens({
        _id: user._id,
        approved: user.approved,
      });

      await userRefresh.updateRefreshToken(user._id, refreshToken);

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
      next(error);
    }
  },
};
module.exports = refreshController;
