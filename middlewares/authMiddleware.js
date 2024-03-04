const tokenService = require("../services/tokenService");

async function authMiddleware(req, res, next) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }
    const userData = await tokenService.verifyAccessToken(accessToken);
    if (!userData) {
      throw new Error();
    }
    req.user = userData;
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        error: true,
        message: "Invalid token",
        success: false,
        data: {},
      });
  }
}
module.exports = authMiddleware;
